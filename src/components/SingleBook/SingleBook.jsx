import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { AspectRatio, Button, Image, Td, Tooltip, Tr } from '@chakra-ui/react'
import React from 'react'
import { useDispatch} from 'react-redux'
import { setEditBook, toggleModalAdd } from '../../store/cases/book/slice';
import { DetailsIcon } from '../icons';

const SingleBook = ({ data, categories, publishers, authors }) => {
    const dispatch = useDispatch();
    const getId = (name, list) => {
        const result = list?.filter(function (el) {
            return el.name === name;
        });
        return Number(result[0].id);
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
    return ( 
        <Tr key={data.id}>
            <Td>{data.id}</Td>
            <Td style={{ display: 'flex', alignItems: 'center' }}>
                <AspectRatio ratio={2 / 3} w="90px" marginRight="10px">
                    <Image
                    src={data.urls[0] || "./static-data/img-none.jpg"}
                    alt="Image book"
                    borderRadius="20px"
                    />
                </AspectRatio>
                {data.name}
            </Td>
            <Td>{data.categoryName}</Td>
            <Td>${data.price}</Td>
            <Td>{data.pages}</Td>
            <Td>
                <Tooltip label="Details" placement='top'>
                    <Button
                        bgColor='#FAFAFA' 
                        _hover={{ 
                            color: '#8D28AD' 
                        }}
                    >
                        <DetailsIcon /> 
                    </Button>
                 </Tooltip>
            </Td>
            <Td mr={4}>
                <Button 
                    bgColor='#FAFAFA' 
                    _hover={{ 
                        color: '#8D28AD' 
                    }}
                    onClick={(e) => {
                        dispatch(toggleModalAdd())
                        dispatch(setEditBook({editBookId: data.id, book: {
                            name: data.name,
                            price: data.price,
                            pages: data.pages,
                            publicationDate: data.publicationDate.split('T')[0],
                            idCategory: getId(data.categoryName, categories),
                            idPublisher: getId(data.publisherName, publishers),
                            idAuthors: getIdAuthors(data.authors, authors),
                            list_img: [],
                            description: data.description
                        }}))
                    }}
                >
                    <EditIcon/>
                </Button>
                <Button 
                    bgColor='#FAFAFA'
                    _hover={{ 
                        color: '#f31b1bcb' 
                    }}
                    onClick={(e) => {
                        // dispatch(toggleModalDelAuthor())
                        // dispatch(setEditAuthor({editAuthorId: id, nameAuthor: name, description: description}))
                    }}
                >
                    <DeleteIcon/>
                </Button>
            </Td>
        </Tr>
    )
};

export default SingleBook;