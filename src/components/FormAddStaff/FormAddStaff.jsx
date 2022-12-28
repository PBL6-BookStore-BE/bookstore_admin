import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, VStack, Text, HStack, Button, useDisclosure } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons'
import './style.css'
import { toast } from "react-toastify";
import { clearValues, toggleModalAdd } from '../../store/cases/staff/slice';
import { FormProvider, useForm } from 'react-hook-form';
import RegisterForm from '../../modules/auth/RegisterForm';
import { schema } from '../../pages/auth/schema/schema';
import { yupResolver } from "@hookform/resolvers/yup";
import { createAdmin } from '../../store/cases/staff/action';

function FormAddStaff(){
  const dispatch = useDispatch();
  const { isModalAddOpen } = useSelector((store) => store.staff);

  const {
    isOpen: isLoading,
    onClose: closeLoading,
    onOpen: openLoading,
  } = useDisclosure();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      address: "",
      phone: "",
    },
    mode: "onSubmit",
  });
  const onSubmit = useCallback(
    async (data, e) => {
      try {
        openLoading();
        const res = await dispatch(createAdmin(data));
        const { payload } = res;
        closeLoading();
        if (payload.isSuccess) {
          toast.success(payload.message, {
            autoClose: 2000,
          });
          e.target.reset();
        } else {
          toast.error(payload.message);
        };
      } catch (error) {
        closeLoading();
        toast.error(error.message);
      }
    },
    [openLoading, closeLoading, dispatch]
  );

  return (
    <div className={`${isModalAddOpen? 'form-add active': 'form-add'}`}>
      <Box className='form-box'>
        <HStack spacing={16} p={[4, 6]} pr={8} bgColor='#F0E4F4'>
          <VStack align='flex-start'>
            <Heading size='md' fontWeight='500'>
              Add Staff
            </Heading>
            <Text fontSize='14px'>
              Add your staff and necessary information from here
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
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <RegisterForm />
            <HStack spacing={4} bgColor='#F0E4F4' p={[4, 6]} >
              <Button 
                type="reset"
                className='btn'
                backgroundColor='#fafafa'  
                color='#636363' 
                _hover={{
                  backgroundColor: '#F0E4F4',
                  color: '#f31b1bcb',
                  border : '1px solid #fafafa'
                }}
              >
                Clear
              </Button>
              <Button 
                isLoading={isLoading}
                disabled={isLoading}
                type="submit"
                className='btn'
                backgroundColor='#8D28AD'  
                color='#fff' 
                _hover={{
                  backgroundColor: '#761793'
                }}
              >
                Add Staff
              </Button>
            </HStack>
          </form>
        </FormProvider>
      </Box>
    </div>
  )
}

export default FormAddStaff