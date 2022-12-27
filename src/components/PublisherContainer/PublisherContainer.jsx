import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import SinglePublisher from '../SinglePublisher/SinglePublisher'
import { Heading, Tooltip, Button} from "@chakra-ui/react";
import { getPublisherBySearch } from '../../store/cases/getAll/slice';
import { Table } from "react-chakra-pagination";
import { setEditPublisher, toggleModalAdd, toggleModalDelPublisher } from '../../store/cases/publisher/slice';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const PublisherContainer = () => {
    const dispatch = useDispatch();
    const { publishers} = useSelector((state) => state.getAll);
    const [page, setPage] = useState(1);

    const loadPublishers = useCallback(async () => {
        try {
        dispatch(getPublisherBySearch());
        } catch (error) {
        console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        loadPublishers();
    }, [loadPublishers, publishers.search, publishers.searchInSelect]);

    if (publishers.isFetching) {
        return <Loading />;
    }
    if (publishers.data.length === 0){
        return (
            <Heading size='md' fontWeight='600' color='#8D28AD'>No publisher to display.....</Heading>
        )
    }

    // eslint-disable-next-line no-sequences
    const tableData = publishers.data.map((pub) => ({key: pub.id}, {
        id: pub.id,
        name: pub.name,
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
                            dispatch(setEditPublisher({editPublisherId: pub.id, namePublisher: pub.name }))
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
                            dispatch(toggleModalDelPublisher())
                            dispatch(setEditPublisher({editPublisherId: pub.id, namePublisher: pub.name }))
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
    <Table
        colorScheme="purple"
        totalRegisters={publishers.data.length}
        page={page}
        onPageChange={(page) => setPage(page)}
        columns={tableColumns}
        data={tableData}
    />
  )
}

export default PublisherContainer
