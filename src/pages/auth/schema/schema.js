
import * as yup from "yup";

export const schema = yup.object({
  fullName: yup.string().required("Please provide a full name."),
  username: yup.string().required("Please provide an username"),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please provide an email address."),
  address: yup.string().required("Please provide an address"),
  phoneNumber: yup.string().required("Please provide a phone number"),
  password: yup
    .string()
    .required("Please provide a password.")
    .min(8, "Your password must be at least 8 characters long."),
  // confirmPassword: yup
  //   .string()
  //   .required("Please provide a confirm password.")
  //   .oneOf([yup.ref("password")], "Confirm Password must match with Password."),
});