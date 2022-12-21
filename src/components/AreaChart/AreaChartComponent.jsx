// import React from 'react'
// import { DatePickerRange } from '../DatePickerRange/DatePickerRange'
// import styled from "styled-components";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from 'recharts';
// import Loading from '../Loading/Loading';
// import { useSelector } from 'react-redux';
// const Styles = styled.div`
//  .react-datepicker-wrapper,
//  .react-datepicker__input-container,
//  .react-datepicker__input-container input {
//    width: 175px;
//  }

//  .react-datepicker__close-icon::before,
//  .react-datepicker__close-icon::after {
//    background-color: grey;
//  }
// `;

// const AreaChart = () => {
//   const { isLoading, data } = useSelector((store) => store.stat);

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div>
//       <Styles>
//         <DatePickerRange />
//       </Styles>
//       <ResponsiveContainer width='100%' height={300}>
//       <AreaChart data={data} margin={{ top: 50 }}>
//         <CartesianGrid strokeDasharray='3 3' />
//         <XAxis dataKey='time' />
//         <YAxis allowDecimals={true} />
//         <Tooltip />
//         <Area type='monotone' dataKey='sales' stroke='#1e3a8a' fill='#3b82f6' />
//       </AreaChart>
//     </ResponsiveContainer>
//     </div>
//   )
// }
// export default AreaChart