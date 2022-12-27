import React, { useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import SingleCategory from '../SingleCategory/SingleCategory'
import { TableContainer, Thead, Th, Tbody, Tr, Heading, Tooltip, Button} from "@chakra-ui/react";
import { getCategoryBySearch } from '../../store/cases/getAll/slice';
import { Table } from "react-chakra-pagination";
import { setEditCate, toggleModalAdd, toggleModalDel } from '../../store/cases/category/slice';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const CategoriesContainer = () => {
    const dispatch = useDispatch();
    const { categories} = useSelector((state) => state.getAll);
    const [page, setPage] = useState(1);
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

    // eslint-disable-next-line no-sequences
    const tableData = categories.data.map((cate) => ({key: cate.id}, {
        id: cate.id,
        name: cate.name,
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
                            dispatch(setEditCate({editCateId: cate.id, nameCate: cate.name }))
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
                            dispatch(toggleModalDel())
                            dispatch(setEditCate({editCateId: cate.id, nameCate: cate.name }))
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
        Header: "NAME",
        accessor: "name"
    },
    {
        Header: "ACTION",
        accessor: "action"
    }

  ];
  return (
    // <TableContainer w='91%' borderRadius={6} backgroundColor='#FAFAFA'>
    //     <Table>
    //         <Thead>
    //             <Tr>
    //                 <Th w='30%'>ID</Th>
    //                 <Th w='38%'>Name</Th>
    //                 <Th w='30%'>Actions</Th>
    //             </Tr>
    //         </Thead>
    //         <Tbody>
    //             {categories.data.map((item) => {
    //                 return (
    //                     <SingleCategory key={item.id} {...item} />
    //                 )
    //             })}
    //         </Tbody>
    //     </Table>
    // </TableContainer>
    <Table
        colorScheme="purple"
        totalRegisters={categories.data.length}
        page={page}
        onPageChange={(page) => setPage(page)}
        columns={tableColumns}
        data={tableData}
    />
  )
}

export default CategoriesContainer
