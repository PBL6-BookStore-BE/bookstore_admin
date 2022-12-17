import React, { useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import SingleCategory from '../SingleCategory/SingleCategory'
import { TableContainer, Thead, Th, Tbody, Table, Tr, Heading} from "@chakra-ui/react";
import { getCategoryBySearch } from '../../store/cases/getAll/slice';

const CategoriesContainer = () => {
    const dispatch = useDispatch();
    const { categories} = useSelector((state) => state.getAll);

    const loadCategory = useCallback(async () => {
        try {
        dispatch(getCategoryBySearch());
        } catch (error) {
        console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        loadCategory();
    }, [loadCategory, categories.search, categories.searchInSelect]);

    if (categories.isFetching) {
        return <Loading />;
    }
    if (categories.data.length === 0){
        return (
            <Heading size='md' fontWeight='600' color='#8D28AD'>No category to display.....</Heading>
        )
    }
  return (
    <TableContainer w='91%' borderRadius={6} backgroundColor='#FAFAFA'>
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
  )
}

export default CategoriesContainer
