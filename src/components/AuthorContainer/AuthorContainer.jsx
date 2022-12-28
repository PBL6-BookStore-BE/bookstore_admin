import React, { useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { TableContainer, Tooltip, Thead, Th, Tbody, Tr, Heading, Button } from "@chakra-ui/react";
import { getAuthorBySearch} from '../../store/cases/getAll/slice';
import SingleAuthor from '../SingleAuthor/SingleAuthor';
import { Table } from "react-chakra-pagination";
import { setEditAuthor, toggleModalAdd, toggleModalDelAuthor } from '../../store/cases/author/slice'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

const AuthorContainer = () => {
    const dispatch = useDispatch();
    const { authors} = useSelector((state) => state.getAll);
    const [page, setPage] = useState(1);

    const loadAuthor = useCallback(async () => {
        try {
        dispatch(getAuthorBySearch());
        } catch (error) {
        console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        loadAuthor();
    }, [loadAuthor, authors.search, authors.searchInSelect]);

    if (authors.isFetching) {
        return <Loading />;
    }
    if (authors.data.length === 0){
        return (
            <Heading size='md' fontWeight='600' color='#8D28AD'>No author to display.....</Heading>
        )
    }

    // eslint-disable-next-line no-sequences
    const tableData = authors.data.map((author) => ( {key: author.id},{
        name: author.name,
        description: author.description,
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
                            dispatch(setEditAuthor({editAuthorId: author.id, nameAuthor: author.name, description: author.description }))
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
                            dispatch(toggleModalDelAuthor())
                            dispatch(setEditAuthor({ editAuthorId: author.id, nameAuthor: author.name, description: author.description }))
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
        Header: "NAME",
        accessor: "name"
    },
    {
        Header: "DESCRIPTION",
        accessor: "description"
    },
    {
        Header: "ACTION",
        accessor: "action"
    }

  ];

  return (
    <Table
        colorScheme="purple"
        totalRegisters={authors.data.length}
        page={page}
        onPageChange={(page) => setPage(page)}
        columns={tableColumns}
        data={tableData}
    />

  )
}

export default AuthorContainer
