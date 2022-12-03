import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleChange, clearValues, createBook, updateBook, toggleModalAdd, addIdAuthor, removeIdAuthor } from '../../store/cases/book/slice';
import UploadImage from '../UploadImage/UploadImage';
import Select from 'react-select';

const FormAddBook = (props) => {
  const dispatch = useDispatch();
  const { onClose } = useDisclosure();
  const { isLoading, book, isEditing, editBookId, isModalAddOpen } = useSelector((store) => store.book);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(!book.name || !book.description ||
    //   !book.price || !book.pages || !book.idCategory || !book.idAuthors){
    //   toast.error("Please fill out all fields");
    //   return;
    // }
    if(isEditing){
      const updateData = {
        // ...book,
        name: book.name,
        price: Number(book.price),
        pages: Number(book.pages),
        publicationDate: book.publicationDate,
        idCategory: book.idCategory,
        idPublisher: book.idPublisher,
        description: book.description,
        id: editBookId
      }
      console.log(updateData);
      dispatch(updateBook(updateData));
      // dispatch(editAuthor({id: editAuthorId, name: nameAuthor, description: description}));
      return;
    }
    dispatch(createBook({
      Name: book.name,
      Description: book.description,
      IdAuthors: book.idAuthors,
      IdCategory: Number(book.idCategory),
      IdPublisher: Number(book.idPublisher),
      Pages: Number(book.pages),
      Price: Number(book.price),
      PublicationDate: book.publicationDate,
      list_img: book.list_img,
    }));
  }

  const handleBookInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const options = [];
  props.authors.map((author) => {
    options.push({
      value: author.id,
      label: author.name,
    });
  });

  const optionsCategory = [];
  props.categories.map((category) => {
    optionsCategory.push({
      value: category?.id,
      label: category?.name,
    });
  });

  const optionsPublishers = [];
  props.publishers.map((publisher) => {
    optionsPublishers.push({
      value: publisher.id,
      label: publisher.name,
    });
  });

  const defaultValue = (value, options) => {
    const index = options.findIndex((element) => element.value === value);
    return index;
  }

  const listAuthors = () => {
    const listAuthors = [];
    book.idAuthors?.map((item) => {
      listAuthors.push(options[defaultValue(item, options)])
    })
    return listAuthors;
  }

  return (
    <Modal isOpen={isModalAddOpen} onClose={onClose} motionPreset='slideInBottom' scrollBehavior='inside' size={'3xl'}>
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
                  value={book?.name}
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
                  value={book.description}
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
                  value={book.price}
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
                  value={book.pages}
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
                  value={book.publicationDate}
                  onChange={handleBookInput}
              />
            </HStack>
            <HStack  w="100%" spacing="42px" mt={4}>
              <Text>Category</Text>
              <Box w="100%">
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    id="idCategory"
                    name="idCategory"
                    defaultValue={optionsCategory[defaultValue(book.idCategory, optionsCategory)]}
                    placeholder='Category'
                    options={optionsCategory}
                    onChange={(event) => {
                      const name = "idCategory";
                      const value = event.value;
                      dispatch(handleChange({ name, value }));
                    }}
                  />
              </Box>
            </HStack>
            <HStack  w="100%" spacing="42px" mt={4}>
              <Text>Publisher</Text>
              <Box w="100%">
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    id="idPublisher"
                    name="idPublisher"
                    placeholder='Publisher'
                    defaultValue={optionsPublishers[defaultValue(book.idPublisher, optionsPublishers)]}
                    options={optionsPublishers}
                    onChange={(event) => {
                      const name = "idPublisher";
                      const value = event.value;
                      dispatch(handleChange({ name, value }));
                    }}
                />
              </Box>
            </HStack>
            <HStack  w="100%" spacing="50px" mt={4}>
              <Text>Authors</Text>
              <Box w="100%">
                <Select
                    name="idAuthors"
                    placeholder='Authors' 
                    className="basic-multi-select"
                    classNamePrefix="select"
                    defaultValue={listAuthors()}
                    options={options}
                    isMulti
                    onChange={(event) => {
                      if (event.length === 0) {
                        dispatch(removeIdAuthor());
                      } else {
                        dispatch(addIdAuthor(event.slice(-1)[0]));
                      }
                    }}
                />
              </Box>
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