import { DownloadIcon } from '@chakra-ui/icons';
import { Box, Button, Grid, Select, GridItem, Input, Table, TableContainer, Tbody, Th, Thead, Tr, VStack, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import SingleOrder from '../../components/SingleOrder/SingleOrder';
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../store/cases/getAll/action';
import Loading from '../../components/Loading/Loading';

const Orders = () => {
  const dispatch = useDispatch();
  const { listOrder } = useSelector((state) => state.getAll);
  const [orders, setOrders] = useState(listOrder.data);
  const [ordersFilter, setOrdersFilter] = useState(orders);
  const statusOptions = [
      { value: true, label: 'Delivered'},
      { value: false, label: 'Pending'},
      { value: "All", label: 'Status'},
  ]
  const [filter, setFilter] = useState({
    status: "All",
    search: ""
  });

  useEffect(() => {
    let data = orders;
    if (filter) {
      if (filter.search === "" && filter.status === "All") {
        setOrdersFilter(orders);
      } else if (filter.search !== "" && filter.status === "All") {
        data = data.filter((element) => element.number.includes(filter.search));
        setOrdersFilter(data);
      } else if (filter.status !== "All" && filter.search === "") {
        data = data.filter((element) => element.status.toString() === filter.status);
        setOrdersFilter(data);
      } else if (filter.status !== "All" && filter.search !== "") {
        data = data.filter((element) => element.status.toString() === filter.status && 
                                                  element.number.includes(filter.search));
        setOrdersFilter(data);
      }
    }
  }, [filter, orders]);

  let data = [];
  useEffect(() => {
    try {
      if (orders.length <= 0) {
        dispatch(listOrders()).then((res) => {
          setOrders(res?.payload);
          setOrdersFilter(res?.payload);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, orders.length]);

  if (orders) {
    orders.map((order) => (
      data.push({
        id: order.id,
        receiverName: order.receiverName,
        idUser: order.idUser,
        status: order.status ? "Delivered" : "Pending",
        payment: order.payment,
        orderAddress: order.orderAddress,
        number: Number(order.number),
        subTotal: (Number(order.total) - 2.35).toFixed(2),
        shippingCost: 2.35,
        total: order.total,
      })
    ))
  } else {
    console.log("null");
  }
  const headers = [
    { label: "Id", key: "id" },
    { label: "Receiver Name", key: "receiverName" },
    { label: "User", key: "idUser" },
    { label: "Status", key: "status" },
    { label: "Payment", key: "payment" },
    { label: "Shipping Address", key: "orderAddress" },
    { label: "Phone", key: "number" },
    { label: "Sub Total", key: "subTotal" },
    { label: "Shipping Cost", key: "shippingCost" },
    { label: "Total", key: "total" },
  ];

  const csvReport = {
    data: data,
    headers: headers,
    filename: 'Orders_Report.csv'
  };

  if (orders.isFetching) {
      return <Loading />;
  }
  return (
    <div>
        <VStack align='flex-start' spacing={8}>
            <Heading color='#8D28AD' size='lg'>Orders</Heading>
            <Grid 
                templateColumns="repeat(10, 1fr)" 
                gap={6} 
                py={8}
                w='100%'
                borderRadius={6}
                mb={6}
            >
                <GridItem colSpan={4}>
                    <Input 
                        type="text" 
                        bgColor='#FAFAFA' 
                        py={6} 
                        placeholder='Search by phone'
                        focusBorderColor='#8D28AD'
                        onChange={(event) => {
                          setFilter({
                            ...filter,
                            search: event.target.value,
                          });
                        }}
                    />
                        
                </GridItem>
                <GridItem colSpan={4}>
                    <Box height="50px">
                    <Select 
                      bgColor='#FAFAFA' size='lg' fontSize='md'
                      value={filter.status}
                      onChange={(event) => {
                          setFilter({
                            ...filter,
                            status: event.target.value,
                          });
                      }}
                  >
                      {statusOptions.map((item) => {
                          return (
                              <option value={item.value} key={item.value}>{item.label}</option>
                          )
                      })}
                  </Select>
                    </Box>
                </GridItem>
                <GridItem colSpan={1}>
                    <CSVLink {...csvReport} >
                      <Button 
                          rightIcon={<DownloadIcon />}
                          backgroundColor='#8D28AD' 
                          color='#fff' 
                          px={10} py={6}
                          _hover={{ 
                              bgColor: '#761793' 
                          }}
                      >
                          Download All Orders
                      </Button>
                    </CSVLink>
                </GridItem>
            </Grid>
            <TableContainer w='100%' borderRadius={6} backgroundColor='#FAFAFA'>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>SR NO</Th>
                            <Th>Time</Th>
                            <Th>Shipping Address</Th>
                            <Th>Phone</Th>
                            <Th>Method</Th>
                            <Th>Amount</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                            <Th>Invoice</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ordersFilter.map((order) => (
                            <SingleOrder key={order.id} order={order} />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </VStack>
    </div>
  )
}

export default Orders