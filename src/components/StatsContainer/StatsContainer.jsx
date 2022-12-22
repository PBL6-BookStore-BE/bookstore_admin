import { Heading, Text, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/StatsContainer';
import { PendingOrders } from '../../store/cases/stat/action';
import { getDailyPaypalIncome, getDailyTotalOrders } from '../../store/cases/stat/slice';
import ThisMonth from '../icons/cases/ThisMonth';
import TodayOrder from '../icons/cases/TodayOrder';
import TotalOrder from '../icons/cases/TotalOrder';
import Loading from '../Loading/Loading';

const StatsContainer = () => {
  const dispatch = useDispatch();
  const { isTotalPaypal, isTotalOrders, isTotalPending, totalOrders, totalPending, totalPaypal } = useSelector((store) => store.stat);
  
  useMemo(async () => {
    const dateNow = new Date().toJSON();
    try {
      dispatch(getDailyTotalOrders(dateNow));
      dispatch(getDailyPaypalIncome(dateNow));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])
  const loadStats = useCallback(async () => {
    try {
        dispatch(PendingOrders());
        } catch (error) {
        console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
      loadStats();
    }, [loadStats]);

    // if(isTotalPaypal || isTotalOrders || isTotalPending){
    //   return (
    //     <Loading />
    //   )
    // }
  return (
    // 
    <Wrapper>
      {/* Today order */}
      <VStack bgColor='#0694a2' p={[4, 6]} borderRadius={12}>
        <TodayOrder />
        <Text color='#FFFFFF' fontWeight='500'>Today Order</Text>
        <Heading color='#FFFFFF'>{totalOrders}</Heading>
      </VStack>
      {/* This Month */}
      <VStack bgColor='#f9e747' p={[4, 6]} borderRadius={12}>
        <ThisMonth />
        <Text color='#FFFFFF' fontWeight='500'>Pending</Text>
        <Heading color='#FFFFFF'>{totalPending}</Heading>
      </VStack>
      {/* Total Order */}
      <VStack bgColor='#0e9f6e' p={[4, 6]} borderRadius={12}>
        <TotalOrder />
        <Text color='#FFFFFF'fontWeight='500'>Today $$$</Text>
        <Heading color='#FFFFFF'>${totalPaypal.toFixed(2)}</Heading>
      </VStack>
    </Wrapper>
  )
}

export default StatsContainer
