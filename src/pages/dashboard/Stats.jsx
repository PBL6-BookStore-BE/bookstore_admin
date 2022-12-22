import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChartsContainer from '../../components/ChartsContainer/ChartsContainer'
import StatsContainer from '../../components/StatsContainer/StatsContainer'
import styled from "styled-components";
import { DatePickerRange } from '../../components/DatePickerRange/DatePickerRange';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TableContainer, Table, Thead, Tr, Th, Tbody, Heading } from '@chakra-ui/react'
import { MonthPickerRange } from '../../components/MonthPickerRange/MonthPickerRange';
import { YearPickerRange } from '../../components/YearPickerRange/YearPickerRange';
import SingleOrderDash from '../../components/SingleOrderDash/SingleOrderDash';
import { listOrders } from '../../store/cases/getAll/action';

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
            {dataDaily.length>0 && <ChartsContainer title='Ngay' data={dataDaily} />}
          </TabPanel>
          <TabPanel>
            <Styles>
              <MonthPickerRange />
            </Styles>
            {dataMonthly.length>0 && <ChartsContainer title='Thang' data={dataMonthly} />}
          </TabPanel>
          <TabPanel>
            <Styles>
              <YearPickerRange />
            </Styles>
            {dataYearly.length>0 && <ChartsContainer title='Nam' data={dataYearly} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Heading mt={14} mb={4} textAlign='left' size='md'>Recent Order</Heading>
      <TableContainer w='100%' borderRadius={6} backgroundColor='#FAFAFA'>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>SR NO</Th>
                            <Th>Date</Th>
                            <Th>Shipping Address</Th>
                            <Th>Phone</Th>
                            <Th>Method</Th>
                            <Th>Amount</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {numDescending.map((order) => (
                            <SingleOrderDash key={order.id} order={order} />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
    </>
  )
}

export default Stats
