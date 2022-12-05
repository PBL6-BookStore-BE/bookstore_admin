import { Box, Button, filter, Grid, Select, GridItem, Input, Table, TableContainer, Tbody, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormAddBook from '../../components/FormAddBook/FormAddBook';
import Loading from '../../components/Loading/Loading';
import ModalDelete from '../../components/ModalDelete/ModalDelete';
import SingleBook from '../../components/SingleBook/SingleBook';
import { toggleModalAdd } from '../../store/cases/book/slice';
import { listAuthors, listBooks, listCategories, listPublishers } from '../../store/cases/getAll/action';

const Book = () => {
  const dispatch = useDispatch();
  const { books, categories, authors, publishers } = useSelector((state) => state.getAll);
  const [bookData, setBookData] = useState(books?.data);
  const [filter, setFilter] = useState({
    category: {
      value: "",
      label: "All Category",
    },
    search: ""
  });

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
      if (bookData.length <= 0) {
        console.log("fetching data");
        dispatch(listBooks()).then((res) => setBookData(res?.payload));
        dispatch(listCategories());
        dispatch(listAuthors());
        dispatch(listPublishers());
      }
    } catch (error) {
      console.log(error);
    }
  }, [bookData.length, dispatch]);
  
  useEffect(() => {
    setBookData(books.data);
  }, [books.data]);

  if (books.isFetching) {
      return <Loading />;
  }
  return (
    <div>
        <VStack align='flex-start' spacing={8}>
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
            <TableContainer w='100%' borderRadius={6} backgroundColor='#FAFAFA'>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Book Name</Th>
                            <Th>Category</Th>
                            <Th>Price</Th>
                            <Th>Page</Th>
                            <Th>Details</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {bookData.map((item) => {
                            return (
                                <SingleBook key={item.id} data={item} categories={categories.dataInSelect} publishers={publishers.dataInSelect} authors={authors.dataInSelect}/>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>

        </VStack>
        <FormAddBook categories={categories.dataInSelect} authors={authors.dataInSelect} publishers={publishers.dataInSelect}/>
        <ModalDelete />
    </div>
  )
}

export default Book