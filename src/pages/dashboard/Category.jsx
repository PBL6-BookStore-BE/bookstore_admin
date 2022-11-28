import React, { useState, useCallback, useEffect } from 'react'
import { useDisclosure, TableContainer, Thead, Th, Tbody, Table, Tr, Td, VStack, Text, Input, Select, Button, Grid, GridItem} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Header from "../../components/Header/Header";
import FormAddCate from '../../components/FormAddCate/FormAddCate'
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../store/cases/getAll/action"
import Loading from "../../components/Loading/Loading";
import SingleCategory from '../../components/SingleCategory/SingleCategory';
import { toggleModalAdd } from '../../store/cases/category/slice';
import ModalDelete from '../../components/ModalDelete/ModalDelete';
import SearchAdmin from '../../components/SearchAdmin/SearchAdmin';

const Category = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.getAll);

    const loadCategory = useCallback(async () => {
        try {
        dispatch(listCategories());
        } catch (error) {
        console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        loadCategory();
    }, [loadCategory]);

    if (categories.isFetching) {
        return <Loading />;
    }
  return (
    <div>
        <Header />
        <VStack align='flex-start' spacing={8} >
            <Text fontWeight='bold' mt={4}>Category</Text>
            <SearchAdmin 
                phInput='Search by category type'
                phSelect='Category'
                name='category'
                list={categories}
                button='+ Add Category'
                modalAdd={toggleModalAdd()}
            />
            <TableContainer w='100%' borderRadius={6} backgroundColor='#FAFAFA'>
                <Table>
                    <Thead>
                        <Tr>
                            <Th w='30%'>ID</Th>
                            <Th w='38%'>Name</Th>
                            <Th w='30%'>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories.data.map((item) => {
                            return (
                                <SingleCategory key={item.id} {...item} />
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>

        </VStack>
        <FormAddCate/>
        <ModalDelete />
    </div>
  )
}

export default Category