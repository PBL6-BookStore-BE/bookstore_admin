import React from 'react'
import { Box, Heading, Input, VStack, Text, HStack, Button } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons'
import './style.css'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, clearValues,  createAuthor, editAuthor, toggleModalAdd } from '../../store/cases/author/slice';

const FormAddAuthor = () => {
  const dispatch = useDispatch();

  const { isLoading, nameAuthor, description, isEditing, editAuthorId, isModalAddOpen } = useSelector((store) => store.author);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!nameAuthor || !description){
      toast.error("Please fill out all fields");
      return;
    }
    if(isEditing){
      dispatch(editAuthor({id: editAuthorId, name: nameAuthor, description: description}));
      return;
    }
    dispatch(createAuthor({name: nameAuthor, description: description}))
  }

  const handleAuthorInput = (e) => {
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
              {isEditing ? 'Edit Author' : 'Add Author'}
            </Heading>
            <Text fontSize='14px'>
              {isEditing ? 'Edit your author and necessary information from here' : 'Add your author and necessary information from here'}
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
        <VStack alignItems='flex-start' spacing={8} m={4}  mb={6}>
            <HStack w="100%" spacing={12}>
                <Text >Name</Text>
                <Input
                    id="nameAuthor"
                    name="nameAuthor"
                    placeholder='Author Name' 
                    type="text"
                    value={nameAuthor}
                    onChange={handleAuthorInput}
                />
            </HStack>
            <HStack  w="100%" spacing={3}>
            <Text >Description</Text>
            <Input
                id="description"
                name="description"
                placeholder='Description' 
                type="text"
                value={description}
                onChange={handleAuthorInput}
            />
            
            </HStack>
        </VStack>
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
            {isEditing ? 'Edit Author' : 'Add Author'}
          </Button>
        </HStack>
      </Box>
    </div>
  )
}

export default FormAddAuthor