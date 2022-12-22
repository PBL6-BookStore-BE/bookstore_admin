import { Box, Button, Divider, Table, TableContainer, Tbody, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../apis/order.api';
import BookLogo from '../../components/common/BookLogo';
import Loading from '../../components/Loading/Loading';
import InvoiceRow from './InvoiceRow/InvoiceRow';
import { useReactToPrint } from "react-to-print";
import PrintIcon from '../../components/icons/cases/PrintIcon';

const Invoice = () => {
  const params = useParams();
  const [invoice, setInvoice] = useState();
  const invoiceRef = useRef(null)

  const pageStyle = `{     
    @page {
    size: A4;
    } 
  }`;

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Invoice",
    pageStyle,
  });

  useEffect(() => {
    getOrderById(params.id).then((res) => setInvoice(res));
  }, [params.id]);

  console.log(invoice);
  if (!invoice) {
    return <Loading />
  }
  return (
    <VStack align='flex-start' spacing={8}>
      <Box w='100%' ref={invoiceRef} id='divToPrint'>
        <Box display='flex' justifyContent="space-between" w='100%' paddingBottom='16px'>
          <Box textAlign='left'>
            <Box color="#000" textTransform="uppercase" fontSize="20px" fontWeight="700">
              Invoice
            </Box>
            <Box color="#707275" fontSize="12px" textTransform="uppercase" display='inline-block' marginTop="4px" marginRight="15px" fontWeight="700">Status:</Box>
            {invoice.status ? (
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
          </Box>
          <Box textAlign='right'>
            <Box justifyContent="flex-end" display='flex'>
              <BookLogo width='110' height='22' />
            </Box>
            <Box color='#707275' fontSize='14px' marginTop='8px' maxWidth='250px'>
              54 Nguyễn Lương Bằng, Hoà Khánh Bắc Liên Chiểu, Đà Nẵng
            </Box>
          </Box>
        </Box>
        <Divider orientation='horizontal' />
        <Box display='flex' justifyContent="space-between" w='100%' paddingTop='16px'>
          <Box textAlign='left'>
            <Box color="#4c4f52" fontSize="14px" textTransform="uppercase" display='inline-block' marginTop="4px" marginRight="15px" fontWeight="700">DATE</Box>
            <Box color='#707275' fontSize='14px'>{invoice.createdDate.split('T')[0]}</Box>
          </Box>
          <Box textAlign='left'>
            <Box color="#4c4f52" fontSize="14px" textTransform="uppercase" display='inline-block' marginTop="4px" marginRight="15px" fontWeight="700">INVOICE NO</Box>
            <Box color='#707275' fontSize='14px'>#{invoice.id}</Box>
          </Box>
          <Box textAlign='right'>
            <Box color="#4c4f52" fontSize="14px" textTransform="uppercase" display='inline-block' fontWeight="700">INVOICE TO.</Box>
            <Box color='#707275' fontSize='14px'>
              {invoice.receiverName}
            </Box>
            <Box color='#707275' fontSize='14px' maxWidth='250px'>
              {invoice.orderAddress}
            </Box>
          </Box>
        </Box>
        <TableContainer m='32px 0'>
          <Table>
            <Thead>
              <Tr>
                <Th textTransform="uppercase" color='#707275'>SR</Th>
                <Th textTransform="uppercase" color='#707275'>Product name</Th>
                <Th textTransform="uppercase" color='#707275'>Quantity</Th>
                <Th textTransform="uppercase" color='#707275'>Item price</Th>
                <Th textTransform="uppercase" color='#707275'>Amount</Th> 
              </Tr>
            </Thead>
            <Tbody>
              {invoice.orderDetails?.map((item, index) => (
                <InvoiceRow id={item.idBook} quantity={item.quantity} index={index} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Box w='100%' padding='24px 32px' borderRadius='12px' backgroundColor='#f9fafb' border='1px solid #f4f5f7'>
          <Box display='flex' justifyContent='space-between'>
            <Box display='flex' textTransform="uppercase" flexDirection='column' textAlign='left'>
              <Box color='#4c4f52' fontWeight='700' fontSize='14px' mb='4px'>Payment Method</Box>
              <Box color='#707275' fontWeight='600' fontSize='14px'>{invoice?.payment}</Box>
            </Box>
            <Box display='flex' textTransform="uppercase" flexDirection='column' textAlign='left'>
              <Box color='#4c4f52' fontWeight='700' fontSize='14px' mb='4px'>Shipping cost</Box>
              <Box color='#707275' fontWeight='600' fontSize='14px'>$2.35</Box>
            </Box>
            <Box display='flex' textTransform="uppercase" flexDirection='column' textAlign='left'>
              <Box color='#4c4f52' fontWeight='700' fontSize='14px' mb='4px'>Total amount</Box>
              <Box color='#f05252' fontWeight='700' fontSize='20px'>${invoice?.total}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display='flex' justifyContent='flex-end' w='100%'>
        <Button 
          backgroundColor='#8D28AD' 
          color='#fff' 
          _hover={{ 
              bgColor: '#761793' 
          }}
          onClick={handlePrint}
          rightIcon={<PrintIcon height='14px' width='14px'/>}
        >
          Print Invoice
        </Button>
      </Box>
    </VStack>
  );
};

export default Invoice;