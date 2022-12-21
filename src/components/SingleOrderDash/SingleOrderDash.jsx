import React, { useState } from 'react'
import { Box, Td, Tr } from '@chakra-ui/react'

const SingleOrderDash = ({order}) => {
    const [status, setStatus] = useState(order.status);
  return (
    <Tr>
        <Td>{order.id}</Td>
        <Td>{order.createdDate.slice(0, 10).split('-').reverse().join('/')}</Td>
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
    </Tr>
  )
}

export default SingleOrderDash