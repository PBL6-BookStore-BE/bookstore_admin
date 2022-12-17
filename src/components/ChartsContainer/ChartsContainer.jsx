import React, { useState } from 'react'
import AreaChart from '../AreaChart/AreaChart'
import Wrapper from '../../assets/wrappers/ChartsContainer';

const ChartsContainer = () => {
  const [month, setMonth] = useState(true);

  return (
    <Wrapper>
      <h4>Thong ke luong Sach ban ra</h4>
      <button type='button' onClick={() => setMonth(!month)}>
        {month ? 'Weekly' : 'Monthly'}
      </button>
      {month ? <AreaChart data='Monthly' /> : <AreaChart data='Weekly' />}
    </Wrapper>
  )
}

export default ChartsContainer
