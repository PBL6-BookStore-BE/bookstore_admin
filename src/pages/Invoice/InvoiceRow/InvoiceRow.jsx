import { Spinner, Td, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getBookById } from '../../../apis/book.api';

const InvoiceRow = ({ id, index, quantity }) => {
  const [data, setData] = useState();

  useEffect(() => {
    getBookById(id).then((res) => setData(res));
  }, [id]);

  if (!data) {
    return (
      <Spinner />
    )
  }
  return (
    <Tr>
      <Td color='#707275'>{index}</Td>
      <Td color='#707275'>{data?.name}</Td>
      <Td color='#24262d' fontWeight='700'>{quantity}</Td>
      <Td color='#24262d' fontWeight='700'>{data?.price}</Td>
      <Td color='#f05252' fontWeight='700'>${(Number(data?.price * quantity).toFixed(2))}</Td>
    </Tr>
  );
};

export default InvoiceRow;