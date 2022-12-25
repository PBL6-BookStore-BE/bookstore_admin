import { AspectRatio, Image, Box, Button, Grid, Select, GridItem, Input, TableContainer, Tbody, Th, Thead, Tr, VStack, Heading, Tooltip, HStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormAddBook from '../../components/FormAddBook/FormAddBook';
import Loading from '../../components/Loading/Loading';
import ModalDelete from '../../components/ModalDelete/ModalDelete';
import SingleBook from '../../components/SingleBook/SingleBook';
import { setEditBook, toggleModalAdd, toggleModalDelBook } from '../../store/cases/book/slice';
import { listAuthors, listBooks, listCategories, listPublishers } from '../../store/cases/getAll/action';
import { Table } from "react-chakra-pagination";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { DetailsIcon } from '../../components/icons';

const Book = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { books, categories, authors, publishers } = useSelector((state) => state.getAll);
  const [bookData, setBookData] = useState(books?.data);
  const [filter, setFilter] = useState({
    category: {
      value: "",
      label: "All Category",
    },
    search: ""
  });

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

  const categoriesOptions = [];
  categoriesOptions.push({
    value: '',
    label: "All Category",
  });
  categories?.dataInSelect.map((item) => {
    categoriesOptions.push({
      value: item.id,
      label: item.name
    });
  })

  useEffect(() => {
    let data = books?.data;
    if (filter) {
      if (filter.search === "" && filter.category.value === "") {
        setBookData(books?.data);
      } else if (filter.search !== "" && filter.category.value === "") {
        data = data.filter((element) => element.name.toLowerCase().includes(filter.search.toLowerCase()));
        setBookData(data);
      } else if (filter.category.value !== "" && filter.search === "") {
        data = data.filter((element) => element.categoryName.toLowerCase().includes(filter.category.label.toLowerCase()));
        setBookData(data);
      } else if (filter.category.value !== "" && filter.search !== "") {
        data = data.filter((element) => element.categoryName.toLowerCase().includes(filter.category.label.toLowerCase()) && 
                                                  element.name.toLowerCase().includes(filter.search.toLowerCase()));
        setBookData(data);
      }
    }
  }, [filter]);

  useEffect(() => {
    try {
      if (books.data.length <= 0) {
        dispatch(listBooks()).then((res) => setBookData(res?.payload));
        dispatch(listCategories());
        dispatch(listAuthors());
        dispatch(listPublishers());
      }
    } catch (error) {
      console.log(error);
    }
  }, [books.data.length, dispatch]);
  
  useEffect(() => {
    setBookData(books.data);
  }, [books.data]);

  if (books.isFetching) {
      return <Loading />;
  }

  // eslint-disable-next-line no-sequences
  const tableData = bookData.map((book) => ( {key: book.id},{
    id: book.id,
    url_name: (
      <HStack>
        <AspectRatio ratio={2 / 3} w="90px" marginRight="10px">
          <Image
          src={book.urls[0] || "./static-data/img-none.jpg"}
          alt="Image book"
          borderRadius="20px"
          />
        </AspectRatio>
        <Text>
          {book.name}
        </Text>
      </HStack>
    ),
    categoryName: book.categoryName,
    price: `$${book.price}`,
    pages: book.pages,
    details: (
      <Tooltip label="Details" placement='top'>
        <Button
            bgColor='#fff' 
            _hover={{ 
                color: '#8D28AD' 
            }}
            onClick={() => navigate(`/book/${book.id}`)}
        >
            <DetailsIcon /> 
        </Button>
      </Tooltip>
    ),
    action: (
      <>
        <Tooltip label="Edit" placement='top'>
            <Button 
                bgColor='#fff' 
                _hover={{ 
                    color: '#8D28AD' 
                }}
                onClick={(e) => {
                    dispatch(toggleModalAdd())
                    dispatch(setEditBook({bookId: book.id, book: {
                      name: book.name,
                      price: book.price,
                      pages: book.pages,
                      publicationDate: book.publicationDate.split('T')[0],
                      idCategory: getId(book.categoryName, categories),
                      idPublisher: getId(book.publisherName, publishers),
                      idAuthors: getIdAuthors(book.authors, authors),
                      list_img: book.urls,
                      description: book.description
                    }}))
                }}
            >
                <EditIcon/>
            </Button>
        </Tooltip>
        <Tooltip label="Delete" placement='top'>
            <Button 
                bgColor='#fff'
                _hover={{ 
                    color: '#f31b1bcb' 
                }}
                onClick={(e) => {
                    dispatch(toggleModalDelBook())
                    dispatch(setEditBook({bookId: book.id, nameBook: book.name }))
                }}
            >
                <DeleteIcon/>
            </Button>
        </Tooltip>
      </>
    )      
}));

const tableColumns = [
  {
      Header: "ID",
      accessor: "id"
  },
  {
      Header: "BOOK NAME",
      accessor: "url_name"
  },
  {
      Header: "CATEGORY",
      accessor: "categoryName"
  },
  {
      Header: "PRICE",
      accessor: "price"
  },
  {
      Header: "PAGES",
      accessor: "pages"
  },
  {
      Header: "DETAILS",
      accessor: "details"
  },
  {
      Header: "ACTION",
      accessor: "action"
  }

  ];

  return (
    <div>
        <VStack align='flex-start' spacing={8}>
            <Heading color='#8D28AD' size='lg'>Book</Heading>
            <Grid 
                templateColumns="repeat(10, 1fr)" 
                gap={6} 
                py={8}
                w='100%'
                borderRadius={6}
                mb={6}
            >
                <GridItem colSpan={4}>
                    <Input 
                        type="text" 
                        bgColor='#FAFAFA' 
                        // name={nameInput}
                        py={6} 
                        // id={nameInput}
                        placeholder='Search by book name'
                        // value={valueInput}
                        // onChange={handleSearch}
                        focusBorderColor='#8D28AD'
                        onChange={(event) => {
                          setFilter({
                            ...filter,
                            search: event.target.value,
                          });
                        }}
                    />
                        
                </GridItem>
                <GridItem colSpan={4}>
                    <Box height="50px">
                    <Select 
                      // name={nameSelect}
                      // id={nameSelect}
                      bgColor='#FAFAFA' size='lg' fontSize='md'
                      value={filter.category.value}
                      // placeholder="Category "
                      onChange={(event) => {
                        const index = event.target.selectedIndex;
                          setFilter({
                            ...filter,
                            category: {
                              value: categoriesOptions[index].value,
                              label: categoriesOptions[index].label
                            },
                          });
                        }}
                  >
                      {categoriesOptions.map((item) => {
                          return (
                              <option value={item.value} key={item.value}>{item.label}</option>
                          )
                      })}
                  </Select>
                    </Box>
                </GridItem>
                <GridItem colSpan={1}>
                    <Button 
                        backgroundColor='#8D28AD' 
                        color='#fff' 
                        px={16} py={6}
                        _hover={{ 
                            bgColor: '#761793' 
                        }}
                        onClick={(e) => dispatch(toggleModalAdd())}
                    >
                        + Add Book
                    </Button>
                </GridItem>
            </Grid>
            {bookData.length === 0 
              ?
                <Heading size='md' fontWeight='600' color='#8D28AD'>No book to display.....</Heading>
              :
                <Table
                  colorScheme="purple"
                  totalRegisters={books.data.length}
                  page={page}
                  onPageChange={(page) => setPage(page)}
                  columns={tableColumns}
                  data={tableData}
                />
            }

        </VStack>
        <FormAddBook categories={categories.dataInSelect} authors={authors.dataInSelect} publishers={publishers.dataInSelect}/>
        <ModalDelete />
    </div>
  )
}

export default Book