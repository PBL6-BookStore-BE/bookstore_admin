import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Button, Td, Tr } from '@chakra-ui/react'
import React from 'react'
import { useDispatch} from 'react-redux'
import { setEditCate, toggleModalAdd, toggleModalDel } from '../../store/cases/category/slice'

const SingleCategory = ({ id, name}) => {
  const dispatch = useDispatch()
  return ( 
    <Tr key={id}>
        <Td>{id}</Td>
        <Td>{name}</Td>
        <Td mr={4}>
            <Button 
                type="submit"
                bgColor='#FAFAFA' 
                _hover={{ 
                    color: '#8D28AD' 
                }}
                onClick={(e) => {
                    dispatch(toggleModalAdd())
                    dispatch(setEditCate({editCateId: id, nameCate: name}))
                }}
            >
                <EditIcon/>
            </Button>
            <Button 
                type="submit"
                bgColor='#FAFAFA'
                _hover={{ 
                    color: '#f31b1bcb' 
                }}
                onClick={(e) => {
                    dispatch(toggleModalDel())
                    dispatch(setEditCate({editCateId: id, nameCate: name}))
                }}
            >
                <DeleteIcon/>
            </Button>
        </Td>
    </Tr>
  )
}

export default SingleCategory
