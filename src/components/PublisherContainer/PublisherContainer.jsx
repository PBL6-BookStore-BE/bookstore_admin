import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import SinglePublisher from '../SinglePublisher/SinglePublisher'
import { TableContainer, Thead, Th, Tbody, Table, Tr, Heading} from "@chakra-ui/react";
import { getPublisherBySearch } from '../../store/cases/getAll/slice';

const PublisherContainer = () => {
    const dispatch = useDispatch();
    const { publishers} = useSelector((state) => state.getAll);

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
                {publishers.data.map((item) => {
                    return (
                        <SinglePublisher key={item.id} {...item} />
                    )
                })}
            </Tbody>
        </Table>
    </TableContainer>
  )
}

export default PublisherContainer
