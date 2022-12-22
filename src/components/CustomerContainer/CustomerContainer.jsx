import { Heading, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerBySearch } from '../../store/cases/customer/slice';
import Loading from '../Loading/Loading';
import SingleCustomer from '../SingleCustomer/SingleCustomer'

const CustomerContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, customers, search } = useSelector((state) => state.customer);
  

  const loadCustomer = useCallback(async () => {
    try {
      dispatch(getCustomerBySearch());
      
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, search]);

  useEffect(() => {
    loadCustomer();
  }, [loadCustomer]);

  if (isLoading) {
    return <Loading />;
  }
  if (customers.length === 0){
    return (
        <Heading size='md' fontWeight='600' color='#8D28AD'>No customer to display.....</Heading>
    )
  }
  return (
    <TableContainer w='100%' borderRadius={6} backgroundColor='#FAFAFA'>
        <Table>
            <Thead>
                <Tr>
                    <Th>JOINING DATE</Th>
                    <Th>Name</Th>
                    <Th>EMAIL</Th>
                    <Th>ADDRESS</Th>
                    <Th>PHONE</Th>
                    <Th>STATE</Th>
                    <Th>ACTION</Th>
                </Tr>
            </Thead>
            <Tbody>
                {customers.map((item) => {
                    return (
                        <SingleCustomer key={item.id} {...item} />
                    )
                })}
            </Tbody>
        </Table>
    </TableContainer>
  )
}

export default CustomerContainer
