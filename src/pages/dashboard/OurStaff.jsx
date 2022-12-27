import { Button, Grid, GridItem, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormAddStaff from '../../components/FormAddStaff/FormAddStaff'
import StaffContainer from '../../components/StaffContainer/StaffContainer'
import { handleChange, toggleModalAdd } from '../../store/cases/staff/slice'

const OurStaff = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.staff);

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  return (
    <div>
      <VStack align='flex-start' spacing={8}>
            <Heading color='#8D28AD' size='lg'>Staff</Heading>
            <Grid 
              templateColumns="repeat(5, 1fr)" 
              gap={6} 
              py={8}
              w='100%'
              borderRadius={6}
              mb={6}
            >
              <GridItem colSpan={4}>
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
              </GridItem>
              <GridItem colSpan={1}>
                <Button 
                  backgroundColor='#8D28AD' 
                  color='#fff' 
                  px={16} py={6}
                  _hover={{ 
                      bgColor: '#761793' 
                  }}
                  onClick={(e) => dispatch(toggleModalAdd())}
                >
                  + Add Staff 
                </Button>
              </GridItem>
            </Grid>
            <StaffContainer />
        </VStack>
        <FormAddStaff/>
    </div>
  )
}

export default OurStaff