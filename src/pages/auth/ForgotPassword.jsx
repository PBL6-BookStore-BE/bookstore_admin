import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import ForgotPasswordForm from "../../modules/auth/ForgotPasswordForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { forgotPassword } from "../../store/cases/auth/action";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please provide an email address."),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });
  const {
    isOpen: isLoading,
    onClose: closeLoading,
    onOpen: openLoading,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ message, setMessage ] = useState("");
  const cancelRef = React.useRef();

  const onSubmit = async (email) => {
    try {
      openLoading();
      dispatch(forgotPassword(email))
        .then((res) => {
          const { payload } = res;
          if (payload.data.isSuccess) {
            onOpen();
            setMessage(payload.data.message);
            closeLoading();
          } else {
            closeLoading();
            toast.error(payload.data.message);
          }
        })
        .catch(() => {
          closeLoading();
        });
    } catch (error) {
      closeLoading();
      toast.error(error);
    }
  };
  return (
    <LayoutAuthentication heading="Forgot Password?">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forgot Password</title>
      </Helmet>
      <Text align="center" color="#808191">
        Confirm your email to receive instructions
        <br /> to reset your password
      </Text>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ForgotPasswordForm />
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
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Success</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </LayoutAuthentication>
  );
};

export default ForgotPassword;
