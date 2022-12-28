
import * as yup from "yup";

export const schema = yup.object({
  fullName: yup.string().required("Please provide a full name."),
  username: yup.string().required("Please provide an username"),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please provide an email address."),
  address: yup.string().required("Please provide an address"),
  phone: yup.string().required("Please provide a phone number"),
});