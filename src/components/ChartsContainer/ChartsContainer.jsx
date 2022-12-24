import { Heading, Highlight } from '@chakra-ui/react';
import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/ChartsContainer';
import AreaChartComponent1 from '../AreaChart/AreaChartComponent1';
import BarChartComponent from '../BarChartComponent/BarChartComponent';

const ChartsContainer = ({title, data}) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <Heading mb={8} textAlign='center' size='lg' fontWeight='600'>
        <Highlight query={title} styles={{color: '#8D28AD'}}>
          {`Biểu đồ mô tả doanh thu của cửa hàng theo ${title}`}
        </Highlight>
      </Heading>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent1 data={data} />}
      
    </Wrapper>
  )
}

export default ChartsContainer
