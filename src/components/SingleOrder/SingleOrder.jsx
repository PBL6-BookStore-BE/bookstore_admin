import { Box, Button, Select, Td, Tooltip, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { listOrders } from '../../store/cases/getAll/action';
import { updateStatus } from '../../store/cases/order/slice';
import { DetailsIcon } from '../icons';

const SingleOrder = ({ order }) => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(order.status);
    const statusOptions = [
        { value: true, label: 'Delivered'},
        { value: false, label: 'Pending'},
    ]
    return ( 
        <Tr>
            <Td>{order.id}</Td>
            <Td>{order.orderAddress}</Td>
            <Td>{order.number}</Td>
            <Td fontWeight="600">{order.payment}</Td>
            <Td fontWeight="600">${order.total}</Td>
            <Td>
                {status ? (
                    <Box
                        display="inline-block"
                        color="#8D28AD"
                        padding="0 8px"
                        fontSize="12px"
                        backgroundColor="rgb(141,40,173,.4)"
                        borderRadius="9999px"
                    >
                        Delivered
                    </Box>
                ) : (
                    <Box
                        display="inline-block"
                        color="#C27803"
                        padding="0 8px"
                        fontSize="12px"
                        backgroundColor="#FDF6B2"
                        borderRadius="9999px"
                    >
                        Pending
                    </Box>
                )}
            </Td>
            <Td>
                <Select 
                    bgColor='#FAFAFA' size='lg' fontSize='md'
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value);
                        try {
                            dispatch(updateStatus({
                                id: Number(order.id),
                                status: (e.target.value === "true"),
                            }));
                            dispatch(listOrders());
                        } catch(err) {
                            console.log(err);
                            toast.error("Can't update status");
                        }
                    }}
                >
                    {statusOptions.map((item) => {
                        return (
                            <option value={item.value} key={item.value}>{item.label}</option>
                        )
                    })}
                </Select>
            </Td>
            {/* <Td>
                <Tooltip label="Details" placement='top'>
                    <Button
                        bgColor='#FAFAFA' 
                        _hover={{ 
                            color: '#8D28AD' 
                        }}
                    >
                        <DetailsIcon /> 
                    </Button>
                 </Tooltip>
            </Td> */}
        </Tr>
    )
};

export default SingleOrder;