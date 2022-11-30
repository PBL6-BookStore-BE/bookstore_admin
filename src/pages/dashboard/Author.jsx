import React, { useState, useCallback, useEffect } from 'react'
import { useDisclosure, TableContainer, Thead, Th, Tbody, Table, Tr, Td, VStack, Text, Input, Select, Button, Grid, GridItem, Heading} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { listAuthors } from "../../store/cases/getAll/action"
import Loading from "../../components/Loading/Loading";
import { toggleModalAdd } from '../../store/cases/author/slice';
import ModalDelete from '../../components/ModalDelete/ModalDelete';
import SingleAuthor from '../../components/SingleAuthor/SingleAuthor'
import FormAddAuthor from '../../components/FormAddAuthor/FormAddAuthor'
import SearchAdmin from '../../components/SearchAdmin/SearchAdmin';

const Author = () => {
    const dispatch = useDispatch();
    const { authors } = useSelector((state) => state.getAll);
    const loadAuthor = useCallback(async () => {
        try {
        dispatch(listAuthors());
        } catch (error) {
        console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        loadAuthor();
    }, [loadAuthor]);

    if (authors.isFetching) {
        return <Loading />;
    }
  return (
    <div>
        <VStack align='flex-start' spacing={8}>
            <Heading color='#8D28AD' size='lg'>Author</Heading>
            {/* <SearchAdmin 
                phInput='Search by author name'
                phSelect='Author'
                name='author'
                list={authors}
                button='+ Add Author'
                modalAdd={toggleModalAdd()}
            /> */}
            <TableContainer w='91%' borderRadius={6} backgroundColor='#FAFAFA'>
                <Table>
                    <Thead>
                        <Tr>
                            <Th w='38%'>Name</Th>
                            <Th w='30%'>Description</Th>
                            <Th w='30%'>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {authors.data.map((item) => {
                            return (
                                <SingleAuthor key={item.id} {...item} />
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>

        </VStack>
        <FormAddAuthor/>
        <ModalDelete />
    </div>
  )
}

export default Author