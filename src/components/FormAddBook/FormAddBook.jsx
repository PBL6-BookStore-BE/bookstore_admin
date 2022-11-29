import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createBook } from '../../apis/book.api';
import { handleChange, clearValues,  createAuthor, editAuthor, toggleModalAdd } from '../../store/cases/book/slice';
import UploadImage from '../UploadImage/UploadImage';

const FormAddBook = (props) => {
  const dispatch = useDispatch();
  const { onClose } = useDisclosure();

  const { isLoading, addBook, isEditing, editAuthorId, isModalAddOpen } = useSelector((store) => store.book);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(!addBook.name || !addBook.description ||
    //   !addBook.price || !addBook.pages || !addBook.idCategory || !addBook.idAuthors){
    //   toast.error("Please fill out all fields");
    //   return;
    // }
    if(isEditing){
      // dispatch(editAuthor({id: editAuthorId, name: nameAuthor, description: description}));
      return;
    }
    const list_img = [];
    addBook.list_img.map((img) => list_img.push(img.files));
    const idAuthors = Number(addBook.idAuthors);

    dispatch(createBook({
      Name: 'Test',
      Description: 'Test',
      IdAuthors: 3,
      IdCategory: 2,
      IdPublisher: 5,
      Pages: 100,
      Price: 100,
      PublicationDate: '2022-10-27 09:21:08.787000',
      list_img: '241255994_404479637728474_6465865513353177354_n.jpg;type=image/jpeg',
    }))
  }

  const handleBookInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    dispatch(handleChange({ name, value }));
  };
  return (
    <Modal isOpen={isModalAddOpen} onClose={onClose} motionPreset='slideInBottom' scrollBehavior='inside'size={'3xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" justifyContent='space-between' spacing={16} p={[4, 6]} pr={8} mb={6} bgColor='#F0E4F4'>
          <VStack align='flex-start'>
            <Heading size='md' fontWeight='500'>
              {isEditing ? 'Edit Book' : 'Add Book'}
            </Heading>
            <Text fontSize='14px'>
              {isEditing ? 'Edit your book and necessary information from here' : 'Add your book and necessary information from here'}
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
        </ModalHeader>
        <ModalBody alignItems='flex-start' spacing={8} m={4}  mb={6}>
            <HStack w="100%" spacing={16}>
              <Text>Name</Text>
              <Input
                  id="name"
                  name="name"
                  placeholder='Book Name' 
                  type="text"
                  value={addBook.name}
                  onChange={handleBookInput}
              />
            </HStack>
            <HStack  w="100%" spacing="26px" mt={4}>
              <Text >Description</Text>
              <Input
                  id="description"
                  name="description"
                  placeholder='Description' 
                  type="text"
                  value={addBook.description}
                  onChange={handleBookInput}
              />
            </HStack>
            <HStack  w="100%" spacing="72px" mt={4}>
              <Text >Price</Text>
              <Input
                  id="price"
                  name="price"
                  placeholder='Price' 
                  type="number"
                  value={addBook.price}
                  onChange={handleBookInput}
              />
            </HStack>
            <HStack  w="100%" spacing={16} mt={4}>
              <Text >Pages</Text>
              <Input
                  id="pages"
                  name="pages"
                  placeholder='Pages' 
                  type="number"
                  value={addBook.pages}
                  onChange={handleBookInput}
              />
            </HStack>
            <HStack  w="100%" spacing={2} mt={4}>
              <Text>Publication Date</Text>
              <Input
                  id="publicationDate"
                  name="publicationDate"
                  placeholder='Publication Date' 
                  type="date"
                  value={addBook.publicationDate}
                  onChange={handleBookInput}
              />
            </HStack>
            <HStack  w="100%" spacing="42px" mt={4}>
              <Text>Category</Text>
              <Select
                  id="idCategory"
                  name="idCategory"
                  placeholder='Category' 
                  value={addBook.categories}
                  onChange={handleBookInput}
              >
                {props.categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Select>
            </HStack>
            <HStack  w="100%" spacing="42px" mt={4}>
              <Text>Publisher</Text>
              <Input
                  id="idPublisher"
                  name="idPublisher"
                  placeholder='Publisher' 
                  type="text"
                  value={addBook.idPublisher}
                  onChange={handleBookInput}
              />
            </HStack>
            <HStack  w="100%" spacing="50px" mt={4}>
              <Text>Authors</Text>
              <Select
                  id="idAuthors"
                  name="idAuthors"
                  placeholder='Authors' 
                  value={addBook.authors}
                  onChange={handleBookInput}
              >
                {props.authors.map((author) => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </Select>
            </HStack>
            <HStack  w="100%" spacing={16} mt={4}>
              <Text>Image</Text>
              <UploadImage />
            </HStack>
        </ModalBody>
        <ModalFooter spacing={4} bgColor='#F0E4F4' p={[4, 6]} >
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
            {isEditing ? 'Edit Book' : 'Add Book'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default FormAddBook;