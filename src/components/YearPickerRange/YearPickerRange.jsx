import { HStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
// import './style.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getYearlySales } from "../../store/cases/stat/slice";
import { toast } from "react-toastify";

export function YearPickerRange() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.stat);
    const newDay = new Date();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handlegetYearlySales = (e) => {
        if(!startDate || !endDate) {
            toast.warning('Please Select Date!!!');
        }
        else{
            dispatch(getYearlySales({startTime: startDate, endTime: endDate}));
        }
    }

    useEffect(() => {
        console.log(startDate, endDate);
        // console.log(newDay);
    }, [startDate, endDate])

    return (
    <HStack spacing='42px'>
        <DatePicker
        isClearable
        filterDate={d => {
            return new Date() > d;
        }}
        placeholderText="Select Start Year"
        showTimeSelect
        dateFormat="yyyy"
        // showYearPicker
        showYearDropdown
        showMonthDropdown
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
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Select End Year"
        showTimeSelect
        dateFormat="yyyy"
        showYearDropdown
        showMonthDropdown
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
            onClick={handlegetYearlySales}
        >
            Submit
        </Button>
    </HStack>
    );
}
