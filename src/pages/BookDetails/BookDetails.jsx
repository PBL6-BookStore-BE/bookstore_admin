import { AspectRatio, Box, Button, Image, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBookById } from '../../apis/book.api';
import FormAddBook from '../../components/FormAddBook/FormAddBook';
import Loading from '../../components/Loading/Loading';
import { setEditBook, toggleModalAdd } from '../../store/cases/book/slice';
import { listAuthors, listCategories, listPublishers } from '../../store/cases/getAll/action';

const BookDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [book, setBook] = useState();
    const { categories, authors, publishers } = useSelector((state) => state.getAll);

    const getId = (name, list) => {
        const result = list?.filter(function (el) {
            return el.name === name;
        });
        return Number(result[0]?.id);
    }
    const getIdAuthors = (name, list) => {
        const result = [];
        // eslint-disable-next-line array-callback-return
        name.map((item) => {
            list.map((element) => {
                if (element.name === item) {
                    result.push(element.id)
                }
            })
        })
        return result;
    }

    useEffect(() => {
        getBookById(params.id).then(res => setBook(res));
        try {
            dispatch(listCategories());
            dispatch(listAuthors());
            dispatch(listPublishers());
          } catch (error) {
            console.log(error);
          }
    }, [dispatch, params.id])

    if (!book) {
        return (
            <Loading />
        )
    }
    return (
        <Box>
            <Text textAlign="start" fontWeight="600" fontSize="26px" mb='4'>Book Details</Text>
            <Stack flexDirection="row">
                <Box>
                    <AspectRatio ratio={2/3} w={300}>
                        <Image
                        src={book?.urls[0] || './static-data/img-none.jpg'}
                        alt="Image book"
                        borderRadius="20px"
                        />
                    </AspectRatio>
                </Box>
                <Box textAlign='start' p="8">
                    <Text fontSize="24px" fontWeight="600" color="#000" mb='20px'>{book?.name}</Text>
                    <Text fontSize="24px" fontWeight="700" color="#000" mb='12px'>${book?.price}</Text>
                    <Text
                        fontSize="16px"
                        fontWeight="400"
                        color="#707275"
                        mb='12px'
                        lineHeight="28px"
                    >
                        {book?.description}
                    </Text>
                    <Box margin="4px 0">
                        <Text color='#24262d !important' as='b' fontSize="14px">Category: </Text>
                        <Text fontSize="14px" fontWeight="600" color="#707275" display='inline'>{book?.categoryName}</Text>
                    </Box>
                    <Box margin="4px 0">
                        <Text color='#24262d !important' as='b' fontSize="14px">Publisher: </Text>
                        <Text fontSize="14px" fontWeight="600" color="#707275" display='inline'>{book?.publisherName}</Text>
                    </Box>
                    <Stack flexDirection="row">
                        {book?.authors.map((author, index) => (
                            <Box
                                key={index}
                                bgColor="#e5e7eb"
                                padding="4px 8px"
                                margin="8px 8px 0 0"
                                borderRadius="9999px"
                                display='inline-block'
                                color="#707275"
                                fontWeight="500"
                                fontSize="14px"
                            >
                                {author}
                            </Box>
                        ))}
                    </Stack>
                    <Button 
                        backgroundColor='#8D28AD' 
                        color='#fff' 
                        px={14}
                        py={4}
                        mt={4}
                        _hover={{ 
                            bgColor: '#761793' 
                        }}
                        onClick={(e) => {
                        dispatch(toggleModalAdd())
                        dispatch(setEditBook({bookId: params.id, book: {
                            name: book.name,
                            price: book.price,
                            pages: book.pages,
                            publicationDate: book.publicationDate.split('T')[0],
                            idCategory: getId(book.categoryName, categories.dataInSelect),
                            idPublisher: getId(book.publisherName, publishers.dataInSelect),
                            idAuthors: getIdAuthors(book.authors, authors.dataInSelect),
                            list_img: book.urls,
                            description: book.description
                        }}))
                    }}
                    >
                        Edit Book
                    </Button>
                </Box>
            </Stack>
            <FormAddBook categories={categories.dataInSelect} authors={authors.dataInSelect} publishers={publishers.dataInSelect}/>
        </Box>
    );
};

export default BookDetails;