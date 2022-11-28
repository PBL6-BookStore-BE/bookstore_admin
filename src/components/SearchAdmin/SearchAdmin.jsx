import React from 'react'
import { useDispatch } from 'react-redux'
import { useDisclosure, TableContainer, Thead, Th, Tbody, Table, Tr, Td, VStack, Text, Input, Select, Button, Grid, GridItem} from "@chakra-ui/react";

const SearchAdmin = ({ phInput, phSelect, name, list, button, modalAdd }) => {
    const dispatch = useDispatch()
  return (
    <Grid 
        templateColumns="repeat(10, 1fr)" 
        gap={6} 
        backgroundColor='#FAFAFA'
        pl={24}
        py={8}
        w='100%'
        borderRadius={6}
        mb={6}
    >
        <GridItem colSpan={4}>
            <Input bgColor='#fff' py={6} placeholder={phInput}/>
        </GridItem>
        <GridItem colSpan={4}>
            <Select 
                name={name}
                id={name}
                placeholder={phSelect} 
                bgColor='#fff' size='lg' fontSize='md'
            >
                {list.data.map((item, index) => {
                    return (
                        <option value={item.name} key={item.id}>{item.name}</option>
                    )
                })}
            </Select>
        </GridItem>
        <GridItem colSpan={1}>
            <Button 
                backgroundColor='#8D28AD' 
                color='#fff' 
                px={16} py={6}
                _hover={{ 
                    bgColor: '#761793' 
                }}
                onClick={(e) => dispatch(modalAdd)}
            >
                {button}
            </Button>
        </GridItem>
    </Grid>
  )
}

export default SearchAdmin