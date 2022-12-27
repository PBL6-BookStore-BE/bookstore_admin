import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChartsContainer from '../../components/ChartsContainer/ChartsContainer'
import StatsContainer from '../../components/StatsContainer/StatsContainer'
import styled from "styled-components";
import { DatePickerRange } from '../../components/DatePickerRange/DatePickerRange';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading, Box } from '@chakra-ui/react'
import { MonthPickerRange } from '../../components/MonthPickerRange/MonthPickerRange';
import { YearPickerRange } from '../../components/YearPickerRange/YearPickerRange';
import SingleOrderDash from '../../components/SingleOrderDash/SingleOrderDash';
import { listOrders } from '../../store/cases/getAll/action';
import { Table } from "react-chakra-pagination";

const Styles = styled.div`
 .react-datepicker-wrapper,
 .react-datepicker__input-container,
 .react-datepicker__input-container input {
   width: 175px;
 }

 .react-datepicker__close-icon::before,
 .react-datepicker__close-icon::after {
   background-color: grey;
 }
`;

const Stats = () => {
  const dispatch = useDispatch()
  const { dataDaily, dataMonthly, dataYearly } = useSelector((store) => store.stat);
  const { listOrder } = useSelector((state) => state.getAll);
  const [page, setPage] = useState(1);

  const loadOrder = useCallback(async () => {
        try {
        dispatch(listOrders());
        } catch (error) {
        console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        loadOrder();
    }, [loadOrder]);
    const numDescending = [...listOrder.data].sort((a, b) => b.id - a.id);
    // eslint-disable-next-line no-sequences
    const tableData = numDescending.map((order) => ({key: order.id}, {
        id: order.id,
        createdDate: order.createdDate.slice(0, 10).split('-').reverse().join('/'),
        orderAddress: order.orderAddress,
        number: order.number,
        payment: order.payment,
        total: order.total,
        status: (
          order.status ? (
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
          )
        )     
    }));

    const tableColumns = [
    {
        Header: "SR NO",
        accessor: "id"
    },
    {
        Header: "DATE",
        accessor: "createdDate"
    },
    {
        Header: "SHIPPING ADDRESS", 
        accessor: "orderAddress"
    },
    {
        Header: "PHONE",
        accessor: "number"
    },
    {
        Header: "METHOD",
        accessor: "payment"
    },
    {
        Header: "AMOUNT",
        accessor: "total"
    },
    {
        Header: "STATUS",
        accessor: "status"
    }
  ];
  return (
    <>
      <StatsContainer />
      <Tabs variant='soft-rounded' mt={16}>
        <TabList>
          <Tab>Daily</Tab>
          <Tab>Monthly</Tab>
          <Tab>Yearly</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Styles>
              <DatePickerRange />
            </Styles>
            {dataDaily.length>0 && <ChartsContainer title='Ngày' data={dataDaily} />}
          </TabPanel>
          <TabPanel>
            <Styles>
              <MonthPickerRange />
            </Styles>
            {dataMonthly.length>0 && <ChartsContainer title='Tháng' data={dataMonthly} />}
          </TabPanel>
          <TabPanel>
            <Styles>
              <YearPickerRange />
            </Styles>
            {dataYearly.length>0 && <ChartsContainer title='Năm' data={dataYearly} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Heading mt={14} mb={4} textAlign='left' size='md'>Recent Order</Heading>
      <Table
          colorScheme="purple"
          totalRegisters={numDescending.length}
          page={page}
          onPageChange={(page) => setPage(page)}
          columns={tableColumns}
          data={tableData}
      />
    </>
  )
}

export default Stats
