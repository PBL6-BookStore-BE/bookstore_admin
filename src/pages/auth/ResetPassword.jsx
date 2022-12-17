import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import ResetPasswordForm from "../../modules/auth/ResetPasswordForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Center, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../../store/cases/auth/action";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please provide an email address."),
  password: yup
    .string()
    .required("Please provide a password.")
    .min(8, "Your password must be at least 8 characters long."),
  confirmPassword: yup
    .string()
    .required("Please provide a confirm password.")
    .oneOf(
      [yup.ref("password")],
      "Confirm Password must match with New Password."
    ),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isOpen: isLoading,
    onClose: closeLoading,
    onOpen: openLoading,
  } = useDisclosure();
  const params = useParams();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    if (params.token) {
      setToken(decodeURIComponent(params.token));
    }
  }, [params]);

  const onSubmit = (data) => {
    data = { ...data, token: token };
    try {
      openLoading();
      dispatch(resetPassword(data)).then((res) => {
        const { payload } = res;
        closeLoading();
        if (payload.data.isSuccess) {
          toast.success("RESET PASSWORD SUCCESS", {
            autoClose: 2000,
          });
          navigate("/login");
        } else {
          toast.error(payload.data.message);
        }
      });
    } catch (error) {
      closeLoading();
      toast.error(error.message);
    }
  };

  return (
    <LayoutAuthentication heading="Reset Password">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
      </Helmet>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ResetPasswordForm />
          <Button
            isLoading={isLoading}
            type="submit"
            className="btn-submit"
            colorScheme="purple"
          >
            Reset Password
          </Button>
          <Center>
            <Button variant="link" colorScheme="purple" mt={4}>
              <Link to="/login">Return to Login</Link>
            </Button>
          </Center>
        </form>
      </FormProvider>
    </LayoutAuthentication>
  );
};

export default ResetPassword;
