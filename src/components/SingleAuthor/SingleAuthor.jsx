import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Button, Td, Tr } from '@chakra-ui/react'
import React from 'react'
import { useDispatch} from 'react-redux'
import { setEditAuthor, toggleModalAdd, toggleModalDelAuthor } from '../../store/cases/author/slice'

const SingleAuthor = ({id, description, name}) => {
  const dispatch = useDispatch()
  return ( 
    <Tr key={id}>
        <Td>{name}</Td>
        <Td>{description}</Td>
        <Td mr={4}>
            <Button 
                bgColor='#FAFAFA' 
                _hover={{ 
                    color: '#8D28AD' 
                }}
                onClick={(e) => {
                    dispatch(toggleModalAdd())
                    dispatch(setEditAuthor({editAuthorId: id, nameAuthor: name, description: description}))
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
                    dispatch(toggleModalDelAuthor())
                    dispatch(setEditAuthor({editAuthorId: id, nameAuthor: name, description: description}))
                }}
            >
                <DeleteIcon/>
            </Button>
        </Td>
    </Tr>
  )
}

export default SingleAuthor
