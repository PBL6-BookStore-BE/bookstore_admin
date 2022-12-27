import { Heading, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getStaffBySearch } from '../../store/cases/staff/slice';
import Loading from '../Loading/Loading';
import SingleStaff from './SingleStaff'

const StaffContainer = () => {
    const dispatch = useDispatch();
    const { isLoading, staffs, search } = useSelector((state) => state.staff);
    
    const loadStaff = useCallback(async () => {
        try {
        dispatch(getStaffBySearch());
        
        } catch (error) {
        console.log(error);
        }
    }, [dispatch, search]);

    useEffect(() => {
        loadStaff();
    }, [loadStaff]);

    if (isLoading) {
        return <Loading />;
    }
    if (staffs.length === 0){
        return (
            <Heading size='md' fontWeight='600' color='#8D28AD'>No staff to display.....</Heading>
        )
    }
  return (
    <TableContainer w='100%' borderRadius={6} backgroundColor='#FAFAFA'>
        <Table>
            <Thead>
                <Tr>
                    <Th>USERNAME</Th>
                    <Th>Name</Th>
                    <Th>EMAIL</Th>
                    <Th>ADDRESS</Th>
                    <Th>PHONE</Th>
                    <Th>STATE</Th>
                    <Th>ACTION</Th>
                </Tr>
            </Thead>
            <Tbody>
                {staffs.map((item) => {
                    return (
                        <SingleStaff key={item.id} {...item} />
                    )
                })}
            </Tbody>
        </Table>
    </TableContainer>
  )
}

export default StaffContainer