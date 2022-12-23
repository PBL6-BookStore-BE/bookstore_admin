import { Box, Select, Td, Tr } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

const SingleStaff = ({ id, isActive, username, fullName, email, phoneNumber, address }) => {
    const dispatch = useDispatch();
    const [isDelete, setIsDelete] = useState(isActive);
    const isDeleteOptions = [
        { value: true, label: 'Activated'},
        { value: false, label: 'Disabled'},
    ]
  return (
    <Tr >
        <Td>{username}</Td>
        <Td>{fullName}</Td>
        <Td>{email}</Td>
        <Td>{address}</Td>
        <Td>{phoneNumber}</Td>
        <Td>
            {isDelete ? (
                <Box
                    display="inline-block"
                    color="#fff"
                    padding="2px 12px 3px"
                    fontSize="18px"
                    backgroundColor="#28ad3a"
                    borderRadius="9999px"
                >
                    Activated
                </Box>
            ) : (
                <Box
                    display="inline-block"
                    color="#fff"
                    padding="2px 12px 3px"
                    fontSize="18px"
                    backgroundColor="#f31b1bcb"
                    borderRadius="9999px"
                >
                    Disabled
                </Box>
            )}
        </Td>
        <Td>
            <Select 
                bgColor='#FAFAFA' size='lg' fontSize='md'
                value={isDelete}
                onChange={(e) => {
                    setIsDelete(e.target.value);
                    try {
                        // dispatch(updateState({
                        //     id: id, 
                        //     state: !isDelete,
                        // }));
                        // dispatch(getCustomerBySearch());
                        console.log(!isDelete);
                    } catch(err) {
                        console.log(err);
                        toast.error("Can't update status");
                    }
                }}
            >
                {isDeleteOptions.map((item) => {
                    return (
                        <option value={item.value} key={item.value}>{item.label}</option>
                    )
                })}
            </Select>
        </Td>
    </Tr>
  )
}

export default SingleStaff