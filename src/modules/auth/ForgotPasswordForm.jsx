import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import ErrorMessage from "../../components/common/ErrorMessage";

const ForgotPasswordForm = () => {
  const { register, clearErrors, control } = useFormContext();
  const { errors } = useFormState({ control });

  return (
    <Box>
      <FormControl mt={4} isInvalid={!!errors.email}>
        <FormLabel mb={2}>Email *</FormLabel>
        <Input
          {...register("email")}
          name="email"
          type="email"
          placeholder="example@gmail.com"
          onChange={() => clearErrors("email")}
        />
        {errors.email && <ErrorMessage error={errors.email.message} />}
      </FormControl>
    </Box>
  );
};

export default ForgotPasswordForm;
