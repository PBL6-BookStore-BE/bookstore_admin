import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Button, Td, Tr } from '@chakra-ui/react'
import React from 'react'
import { useDispatch} from 'react-redux'
import { setEditPublisher, toggleModalAdd, toggleModalDelPublisher } from '../../store/cases/publisher/slice'

const SinglePublisher = ({ id, name}) => {
  const dispatch = useDispatch()
  return ( 
    <Tr key={id}>
        <Td>{id}</Td>
        <Td>{name}</Td>
        <Td mr={4}>
            <Button 
                bgColor='#FAFAFA' 
                _hover={{ 
                    color: '#8D28AD' 
                }}
                onClick={(e) => {
                    dispatch(toggleModalAdd())
                    dispatch(setEditPublisher({editPublisherId: id, namePublisher: name}))
                }}
            >
                <EditIcon/>
            </Button>
            <Button 
                bgColor='#FAFAFA'
                _hover={{ 
                    color: '#f31b1bcb' 
                }}
                onClick={(e) => {
                    dispatch(toggleModalDelPublisher())
                    dispatch(setEditPublisher({editPublisherId: id, namePublisher: name}))
                }}
            >
                <DeleteIcon/>
            </Button>
        </Td>
    </Tr>
  )
}

export default SinglePublisher
