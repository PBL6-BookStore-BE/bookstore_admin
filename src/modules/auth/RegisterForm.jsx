import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { memo } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import ErrorMessage from "../../components/common/ErrorMessage";

function RegisterForm() {
  const { register, clearErrors, control } = useFormContext();
  const { errors } = useFormState({ control });

  return (
    <Box px={4} pt={2} pb={6}>
      <FormControl mt={4} isInvalid={!!errors.fullName}>
        <FormLabel mb={2}>Full Name *</FormLabel>
        <Input
          {...register("fullName")}
          name="fullName"
          type="text"
          placeholder="Jhon Doe"
          onChange={() => clearErrors("fullName")}
        />
        {errors.fullName && <ErrorMessage error={errors.fullName.message} />}
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors.username}>
        <FormLabel mb={2}>User Name *</FormLabel>
        <Input
          {...register("username")}
          name="username"
          type="text"
          placeholder="Jhon Doe"
          onChange={() => clearErrors("username")}
        />
        {errors.username && <ErrorMessage error={errors.username.message} />}
      </FormControl>
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
      <FormControl mt={4} isInvalid={!!errors.address}>
        <FormLabel mb={2}>Address *</FormLabel>
        <Input
          {...register("address")}
          name="address"
          type="text"
          placeholder="Da Nang"
          onChange={() => clearErrors("address")}
        />
        {errors.address && <ErrorMessage error={errors.address.message} />}
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors.phone}>
        <FormLabel mb={2}>Phone Number *</FormLabel>
        <Input
          {...register("phone")}
          name="phone"
          type="text"
          placeholder="0379478263"
          onChange={() => clearErrors("phone")}
        />
        {errors.phone && <ErrorMessage error={errors.phone.message} />}
      </FormControl>
    </Box>
  );
}

export default memo(RegisterForm);
