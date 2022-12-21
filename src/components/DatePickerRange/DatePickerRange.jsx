import { HStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
// import './style.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getDailySales } from "../../store/cases/stat/slice";
import { toast } from "react-toastify";

export function DatePickerRange() {
    const dateNow = new Date();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.stat);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleGetDailySales = (e) => {
        if(!startDate || !endDate) {
            toast.warning('Please Select Date!!!');
        }
        else{
            dispatch(getDailySales({startTime: startDate, endTime: endDate}));
        }
    }

    return (
    <HStack spacing='42px'>
        <DatePicker
        isClearable
        filterDate={d => {
            return new Date() > d;
        }}
        placeholderText="Select Start Date"
        showTimeSelect
        dateFormat="MMMM d, yyyy"
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        onChange={date => setStartDate(date)}
        />
        <DatePicker
        isClearable
        filterDate={d => {
            return new Date() > d;
        }}
        placeholderText="Select End Date"
        showTimeSelect
        dateFormat="MMMM d, yyyy"
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        onChange={date => setEndDate(date)}
        />
        <Button
            width={52}
            backgroundColor='#8D28AD'  
            color='#fff' 
            _hover={{
                backgroundColor: '#761793'
            }}
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            onClick={handleGetDailySales}
        >
            Submit
        </Button>
    </HStack>
    );
}
