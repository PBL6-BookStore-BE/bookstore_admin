
import { Input, Select, Button, Grid, GridItem} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearValueSearch, clearValueSearchInSelect, handleChange } from "../../store/cases/getAll/slice";

const SearchAdmin = ({ phInput, phSelect, nameInput, nameSelect, list, button, modalAdd, valueInput, valueSelect }) => {
    const dispatch = useDispatch();
    const [stateValueInput, setStateValueInput] = useState(false);

    const handleSearch = (e) => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
    }; 
    useEffect (() => {
        if(valueInput !== ''){
            setStateValueInput(true);
            dispatch(clearValueSearchInSelect())
        }
        else{
            setStateValueInput(false);
            dispatch(clearValueSearch())
        }
    }, [valueInput, dispatch])
    console.log(list)
  return (
    <Grid 
        templateColumns="repeat(10, 1fr)" 
        gap={6} 
        py={8}
        w='100%'
        borderRadius={6}
        mb={6}
    >
        <GridItem colSpan={4}>
            <Input 
                type="text" 
                bgColor='#FAFAFA' 
                name={nameInput} py={6} 
                id={nameInput}
                placeholder={phInput} 
                value={valueInput}
                onChange={handleSearch}
                focusBorderColor='#8D28AD'
            />
                
        </GridItem>
        <GridItem colSpan={4}>
            {stateValueInput ?
                <Select 
                name={nameSelect}
                id={nameSelect}
                bgColor='#FAFAFA' size='lg' fontSize='md'
                value={valueSelect}
                placeholder={phSelect}
                onChange={handleSearch}
                disabled
            >
                {list.map((item, index) => {
                    return (
                        <option value={item.name} key={item.id}>{item.name}</option>
                    )
                })}
            </Select>
            : <Select 
                name={nameSelect}
                id={nameSelect}
                bgColor='#FAFAFA' size='lg' fontSize='md'
                value={valueSelect}
                placeholder={phSelect}
                onChange={handleSearch}
                focusBorderColor='#8D28AD'
            >
                {list.map((item, index) => {
                    return (
                        <option value={item.name} key={item.id}>{item.name}</option>
                    )
                })}
            </Select>}
        </GridItem>
        <GridItem colSpan={1}>
            <Button 
                backgroundColor='#8D28AD' 
                color='#fff' 
                px={16} py={6}
                _hover={{ 
                    bgColor: '#761793' 
                }}
                onClick={(e) => dispatch(modalAdd)}
            >
                {button}
            </Button>
        </GridItem>
    </Grid>
  )
}

export default SearchAdmin