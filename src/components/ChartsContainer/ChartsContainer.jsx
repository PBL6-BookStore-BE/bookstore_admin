import { Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/ChartsContainer';
import AreaChartComponent1 from '../AreaChart/AreaChartComponent1';
import BarChartComponent from '../BarChartComponent/BarChartComponent';
import Loading from '../Loading/Loading';

const ChartsContainer = ({title, data}) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <Heading mb={8} textAlign='center' size='lg' fontWeight='600'>Bieu do mo ta doanh thu cua cua hang theo {title}</Heading>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent1 data={data} />}
      
    </Wrapper>
  )
}

export default ChartsContainer
