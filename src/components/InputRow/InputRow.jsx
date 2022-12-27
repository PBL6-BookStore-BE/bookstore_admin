import { FormControl, FormLabel, HStack, Input } from '@chakra-ui/react'
import React from 'react'

const InputRow = ({ name, placeHolder, value, isInvalid, onChange }) => {
    return (
        <FormControl mt={8} w='92%' >
            <HStack ml={16}>
                <FormLabel fontSize='18px' w='20%' mb={2}>{placeHolder}</FormLabel>
                <Input
                value={value}
                name={name}
                type="text"
                placeholder={placeHolder}
                onChange={onChange}
                isInvalid={isInvalid}
                errorBorderColor='red.300'
                focusBorderColor='#8D28AD'
                />
            </HStack>
        </FormControl>
    )
}

export default InputRow