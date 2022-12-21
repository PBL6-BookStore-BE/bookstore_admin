import React from 'react'
import { DatePickerRange } from '../DatePickerRange/DatePickerRange'
import styled from "styled-components";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import Loading from '../Loading/Loading';

const AreaChartComponent1 = ({data}) => {

  return (
    <div>
      <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='time' />
        <YAxis allowDecimals={true} />
        <Tooltip />
        <Area type='monotone' dataKey='sales' stroke='#1e3a8a' fill='#3b82f6' />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  )
}

export default AreaChartComponent1