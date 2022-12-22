import { Grid, GridItem, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomerContainer from '../../components/CustomerContainer/CustomerContainer'
import { handleChange } from '../../store/cases/customer/slice';

const Customer = () => {
  const dispatch = useDispatch();
  const { isLoading, customers, search } = useSelector((state) => state.customer);

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  return (
    <div>
        <VStack align='flex-start' spacing={8} >
            <Heading color='#8D28AD' size='lg'>Customers</Heading>
            <Input 
                type="text" 
                bgColor='#FAFAFA' 
                name='search' py={6} 
                id='search'
                placeholder='Search by email/phone'
                value={search}
                onChange={handleSearch}
                focusBorderColor='#8D28AD'
            />
            <CustomerContainer />
        </VStack>
    </div>
  )
}

export default Customer
