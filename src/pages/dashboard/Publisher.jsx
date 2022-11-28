import React, {useState} from 'react'
import { TableContainer, Thead, Th, Tbody, Table, Tr, Td, VStack, Text, Input, Select, Button, Grid, GridItem } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Header from "../../components/Header/Header";
import ModalDelete from '../../components/ModalDelete/ModalDelete'

const Publisher = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false)
  return (
    <div >
        <Header />
        <VStack align='flex-start' spacing={8} >
            <Text fontWeight='bold' mt={4}>Category</Text>
            <Grid 
                templateColumns="repeat(10, 1fr)" 
                gap={6} 
                backgroundColor='#FAFAFA'
                px={4}
                py={8}
                w='98%'
                borderRadius={6}
                mb={6}
            >
                <GridItem colSpan={4}>
                    <Input bgColor='#fff' py={6} placeholder="Search by publisher name"/>
                </GridItem>
                <GridItem colSpan={4}>
                    <Select placeholder='Publisher' bgColor='#fff' size='lg' fontSize='md'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
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
                    >
                        + Add Publisher
                    </Button>
                </GridItem>
            </Grid>
            <TableContainer w='98%' borderRadius={6} backgroundColor='#FAFAFA'>
                <Table>
                    <Thead>
                        <Tr>
                            <Th w='30%'>ID</Th>
                            <Th w='38%'>Name</Th>
                            <Th w='30%'>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>Century ABC (2018)</Td>
                            <Td mr={4}>
                                <Button 
                                    bgColor='#FAFAFA' 
                                    _hover={{ 
                                        color: '#8D28AD' 
                                    }}
                                >
                                    <EditIcon/>
                                </Button>
                                <Button 
                                    bgColor='#FAFAFA'
                                    _hover={{ 
                                        color: '#f31b1bcb' 
                                    }}
                                    onClick={(e) => setIsModalOpen(!isModalOpen)}
                                >
                                    <DeleteIcon/>
                                </Button>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>1</Td>
                            <Td>Garamedia  (2020)</Td>
                            <Td mr={4}>
                                <Button 
                                    bgColor='#FAFAFA' 
                                    _hover={{ 
                                        color: '#8D28AD' 
                                    }}
                                >
                                    <EditIcon/>
                                </Button>
                                <Button 
                                    bgColor='#FAFAFA'
                                    _hover={{ 
                                        color: '#f31b1bcb' 
                                    }}
                                    onClick={(e) => setIsModalOpen(!isModalOpen)}
                                >
                                    <DeleteIcon/>
                                </Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </VStack>
        <ModalDelete isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  )
}

export default Publisher