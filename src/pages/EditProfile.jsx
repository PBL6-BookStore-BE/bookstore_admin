import { FormControl, FormLabel, Heading, Input, VStack, HStack, Button, Box} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import InputRow from '../components/InputRow/InputRow'
import { editProfileStaff } from '../store/cases/staff/action';
import { getInforUser } from '../store/cases/user/action';

const EditProfile = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const { isLoading1 } = useSelector((state) => state.staff);
    const [getUserInfo, setUserInfo] = useState([]);

    const updated = () => {
        const profile = {
            fullName: getUserInfo?.fullName,
            username: getUserInfo?.userName,
            phone: getUserInfo?.phoneNumber,
            address: getUserInfo?.address
        }
        try {
            dispatch(editProfileStaff(profile));
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        const email = localStorage.getItem("email") || "";
        if (email) {
            dispatch(getInforUser(email)).then(res => setUserInfo(res.payload));
        }
    }, [dispatch]);

  return (
    <div>
        <VStack align='flex-start' spacing={8}>
            <Heading mb={8} color='#8D28AD' size='lg'>Edit Profile</Heading>
            <FormControl mt={8} w='92%' >
                <HStack ml={16}>
                    <FormLabel fontSize='18px' w='20%' mb={2}>Email</FormLabel>
                    <Input
                    value={userInfo?.email || ""}
                    type="text"
                    disabled
                    />
                </HStack>
            </FormControl>
            
            <InputRow
                name='fullname'
                placeHolder='Full Name'
                value={getUserInfo?.fullName || ""}
                isInvalid={!getUserInfo?.fullName ? true : false}
                onChange={(event) => setUserInfo({
                    ...getUserInfo,
                    fullName: event.target.value,
                })}
            />
            <InputRow
                name='username'
                placeHolder='User Name'
                value={getUserInfo?.userName || ""}
                isInvalid={!getUserInfo?.userName ? true : false}
                onChange={(event) => setUserInfo({
                    ...getUserInfo,
                    userName: event.target.value,
                })}
            />
            <InputRow
                name='phone'
                placeHolder='Phone Number'
                value={getUserInfo?.phoneNumber || ""}
                isInvalid={!getUserInfo?.phoneNumber ? true : false}
                onChange={(event) => setUserInfo({
                    ...getUserInfo,
                    phoneNumber: event.target.value,
                })}
            />
            <InputRow
                name='address'
                placeHolder='Address'
                value={getUserInfo?.address || ""}
                isInvalid={!getUserInfo?.address ? true : false}
                onChange={(event) => setUserInfo({
                    ...getUserInfo,
                    address: event.target.value,
                })}
            />
        </VStack>
        <Box mt={8} mr={24} display='flex' justifyContent='end'>
            <Button 
                isLoading={isLoading1}
                disabled={isLoading1}
                type="submit"
                backgroundColor='#8D28AD'  
                color='#fff' 
                _hover={{
                backgroundColor: '#761793'
                }}
                onClick={updated}
            >
                Update Profile
            </Button>
        </Box>
    </div>
  )
}

export default EditProfile