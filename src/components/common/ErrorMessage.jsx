import { FormErrorMessage } from '@chakra-ui/react';
import React from 'react';
import PropTypes from "prop-types";

const ErrorMessage = (props) => {
    const { error="" } = props;
    return (
        <FormErrorMessage as="p">{error}</FormErrorMessage>
    );
};
ErrorMessage.propTypes = {
  error: PropTypes.string
}
export default ErrorMessage;