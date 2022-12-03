import { Table, TableContainer, Tbody, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormAddBook from '../../components/FormAddBook/FormAddBook';
import Loading from '../../components/Loading/Loading';
import ModalDelete from '../../components/ModalDelete/ModalDelete';
import SearchAdmin from '../../components/SearchAdmin/SearchAdmin';
import SingleAuthor from '../../components/SingleAuthor/SingleAuthor';
import SingleBook from '../../components/SingleBook/SingleBook';
import { toggleModalAdd } from '../../store/cases/book/slice';
import { listAuthors, listBooks, listCategories, listPublishers } from '../../store/cases/getAll/action';

const Book = () => {
  const dispatch = useDispatch();
  const { books, categories, authors, publishers } = useSelector((state) => state.getAll);
  // const [bookData, setBookData] = useState(books?.data);

  const loadData = useCallback(async () => {
    try {
      dispatch(listBooks());
      dispatch(listCategories());
      dispatch(listAuthors());
      dispatch(listPublishers());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (books.isFetching) {
      return <Loading />;
  }
  return (
    <div>
        <VStack align='flex-start' spacing={8}>
            <SearchAdmin 
                phInput='Search by book name'
                phSelect='Category'
                name='book'
                list={categories.dataInSelect}
                button='+ Add Book'
                modalAdd={toggleModalAdd()}
            />
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
                        {books.data.map((item) => {
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