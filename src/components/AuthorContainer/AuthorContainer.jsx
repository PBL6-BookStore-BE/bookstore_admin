import React, { useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { TableContainer, Thead, Th, Tbody, Table, Tr, Heading} from "@chakra-ui/react";
import { getAuthorBySearch} from '../../store/cases/getAll/slice';
import SingleAuthor from '../SingleAuthor/SingleAuthor';

const AuthorContainer = () => {
    const dispatch = useDispatch();
    const { authors} = useSelector((state) => state.getAll);

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
  return (
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
  )
}

export default AuthorContainer
