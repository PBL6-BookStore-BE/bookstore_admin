import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import Wrapper from '../../assets/wrappers/StatsContainer';
import StartItem from '../../assets/wrappers/StatsContainer';
import ThisMonth from '../icons/cases/ThisMonth';
import TodayOrder from '../icons/cases/TodayOrder';
import TotalOrder from '../icons/cases/TotalOrder';

const StatsContainer = () => {
  return (
    // 
    <Wrapper>
      {/* Today order */}
      <VStack bgColor='#0694a2' p={[4, 6]} borderRadius={12}>
        <TodayOrder />
        <Text color='#FFFFFF'>Today Order</Text>
        <Heading color='#FFFFFF'>$73</Heading>
      </VStack>
      {/* This Month */}
      <VStack bgColor='#3f83f8' p={[4, 6]} borderRadius={12}>
        <ThisMonth />
        <Text color='#FFFFFF'>This Month</Text>
        <Heading color='#FFFFFF'>$5444.65</Heading>
      </VStack>
      {/* Total Order */}
      <VStack bgColor='#0e9f6e' p={[4, 6]} borderRadius={12}>
        <TotalOrder />
        <Text color='#FFFFFF'>Total Order</Text>
        <Heading color='#FFFFFF'>$22924.80</Heading>
      </VStack>
    </Wrapper>
  )
}

export default StatsContainer
