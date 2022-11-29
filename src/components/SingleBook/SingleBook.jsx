import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { AspectRatio, Button, Image, Td, Tooltip, Tr } from '@chakra-ui/react'
import React from 'react'
import { useDispatch} from 'react-redux'
import { setEditAuthor, toggleModalAdd } from '../../store/cases/book/slice';
import { DetailsIcon } from '../icons';

const SingleBook = ({id, name, categoryName, price, pages, urls}) => {
    const dispatch = useDispatch();
    return ( 
        <Tr key={id}>
            <Td>{id}</Td>
            <Td style={{ display: 'flex', alignItems: 'center' }}>
                <AspectRatio ratio={2 / 3} w="90px" marginRight="10px">
                    <Image
                    src={urls[0] || "./static-data/img-none.jpg"}
                    alt="Image book"
                    borderRadius="20px"
                    />
                </AspectRatio>
                {name}
            </Td>
            <Td>{categoryName}</Td>
            <Td>${price}</Td>
            <Td>{pages}</Td>
            <Td>
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
            </Td>
            <Td mr={4}>
                <Button 
                    bgColor='#FAFAFA' 
                    _hover={{ 
                        color: '#8D28AD' 
                    }}
                    onClick={(e) => {
                        // dispatch(toggleModalAdd())
                        // dispatch(setEditAuthor({editAuthorId: id, nameAuthor: name, description: description}))
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
                        // dispatch(toggleModalDelAuthor())
                        // dispatch(setEditAuthor({editAuthorId: id, nameAuthor: name, description: description}))
                    }}
                >
                    <DeleteIcon/>
                </Button>
            </Td>
        </Tr>
    )
};

export default SingleBook;