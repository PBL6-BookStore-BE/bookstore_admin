import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import ErrorMessage from "../../components/common/ErrorMessage";

const ResetPasswordForm = () => {
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
      <FormControl mt={4} isInvalid={!!errors.password}>
        <FormLabel mb={2}>New Password *</FormLabel>
        <Input
          {...register("password")}
          name="password"
          type="password"
          placeholder="Enter new password"
          onChange={() => clearErrors("password")}
        />
        {errors.password && (
          <ErrorMessage error={errors.password.message} />
        )}
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors.confirmPassword}>
        <FormLabel mb={2}>Confirm New Password *</FormLabel>
        <Input
          {...register("confirmPassword")}
          name="confirmPassword"
          type="password"
          placeholder="Enter new password"
          onChange={() => clearErrors("confirmPassword")}
        />
        {errors.confirmPassword && (
          <ErrorMessage error={errors.confirmPassword.message} />
        )}
      </FormControl>
    </Box>
  );
};

export default ResetPasswordForm;
