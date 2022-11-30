import React from 'react'
import {  Box, Heading, Highlight, Text, HStack, VStack, Button } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCate, toggleModalDel } from '../../store/cases/category/slice';
import { deleteAuthor, toggleModalDelAuthor } from '../../store/cases/author/slice';
import { deletePublisher, toggleModalDelPublisher } from '../../store/cases/publisher/slice';

const ModalDelete = () => {
  const dispatch = useDispatch()
  const { isModalDelOpen, nameCate, editCateId } = useSelector((store) => store.category)
  const { isModalDelAuthorOpen, nameAuthor, description, editAuthorId } = useSelector((store) => store.author)
  const { isModalDelPublisherOpen, namePublisher, editPublisherId } = useSelector((store) => store.publisher)

  return (
    <div className={`${isModalDelOpen || isModalDelAuthorOpen || isModalDelPublisherOpen ? 'main-modal active' : 'main-modal'}`}>
      <Box className='box'>
          <DeleteIcon color='#f31b1bcb' w={7} h={7} mb={5} mt={16}/>
          <Heading size='md'>
            <Highlight 
              size='md'
              query={nameCate || nameAuthor || namePublisher}
              styles={{color: '#f31b1bcb'}}
            >
              {`Are You Sure! Want to Delete ${nameCate || nameAuthor || namePublisher} Record?`}
            </Highlight>

          </Heading>
          <Text>
            Do you really want to delete these records? You can't view this in your list anymore if you delete!
          </Text>
          <HStack mt={10} justifyContent="center" spacing={6}>
            <Button
              backgroundColor='#F0E4F4'  
              color='#636363' 
              _hover={{
                backgroundColor: '#d3cad6'
              }}
              w={32}
              onClick={(e) => nameCate ? dispatch(toggleModalDel()) : ( nameAuthor ? dispatch(toggleModalDelAuthor()) : dispatch(toggleModalDelPublisher()))}
            >
              No, Keep it
            </Button>
            <Button
              backgroundColor='#8D28AD'  
              color='#fff' 
              _hover={{
                backgroundColor: '#761793'
              }}
              w={32}
              onClick={() => nameCate ? dispatch(deleteCate(editCateId)) : ( nameAuthor ? dispatch(deleteAuthor(editAuthorId)) : dispatch(deletePublisher(editPublisherId)))}
            >
              Yes, Delete it
            </Button>
          </HStack>
      </Box>
    </div>
  )
}

export default ModalDelete