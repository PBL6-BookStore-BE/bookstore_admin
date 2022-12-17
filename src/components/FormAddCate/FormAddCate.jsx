import React from 'react'
import { Box, Heading, Input, VStack, Text, HStack, Button } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons'
import './style.css'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, clearValues,  createCate, editCate, toggleModalAdd } from '../../store/cases/category/slice';

const FormAddCate = () => {
  const dispatch = useDispatch();

  const { isLoading, nameCate, isEditing, editCateId, isModalAddOpen } = useSelector((store) => store.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!nameCate){
      toast.error("Please fill out all fields");
      return;
    }
    if(isEditing){
      dispatch(editCate({id:editCateId, name: nameCate}));
      return;
    }
    dispatch(createCate({name: nameCate}))
  }

  const handleCateInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
 
  return (
    <div className={`${isModalAddOpen? 'form-add active': 'form-add'}`}>

      <Box className='form-box'>
        <HStack spacing={16} p={[4, 6]} pr={8} mb={6} bgColor='#F0E4F4'>
          <VStack align='flex-start'>
            <Heading size='md' fontWeight='500'>
              {isEditing ? 'Edit Category' : 'Add Category'}
            </Heading>
            <Text fontSize='14px'>
              {isEditing ? 'Edit your Product category and necessary information from here' : 'Add your Product category and necessary information from here'}
            </Text>
          </VStack>
          <Box 
            className='icon-close' 
            onClick={(e) => {
              dispatch(toggleModalAdd())
              dispatch(clearValues())
            }}
          >
            <CloseIcon m='15px' w='10px' h='10px'/>
          </Box>
        </HStack>
        <HStack alignItems='flex-start' spacing={8} m={4}  mb={6}>
          <Text >Name</Text>
          <Input
            id="nameCate"
            name="nameCate"
            placeholder='Category Name' 
            type="text"
            value={nameCate}
            onChange={handleCateInput}
            focusBorderColor='#8D28AD'
          />
        </HStack>
        <HStack spacing={4} bgColor='#F0E4F4' p={[4, 6]} >
          <Button 
            className='btn'
            backgroundColor='#fafafa'  
            color='#636363' 
            _hover={{
              backgroundColor: '#F0E4F4',
              color: '#f31b1bcb',
              border : '1px solid #fafafa'
            }}
            onClick={(e) => dispatch(clearValues())}
          >
            Clear
          </Button>
          <Button 
            className='btn'
            backgroundColor='#8D28AD'  
            color='#fff' 
            _hover={{
              backgroundColor: '#761793'
            }}
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            onClick={handleSubmit}
          >
            {isEditing ? 'Edit Category' : 'Add Category'}
          </Button>
        </HStack>
      </Box>
    </div>
  )
}

export default FormAddCate