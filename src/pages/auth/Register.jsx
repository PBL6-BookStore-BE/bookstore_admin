import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import RegisterForm from "../../modules/auth/RegisterForm";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { Button, useDisclosure } from "@chakra-ui/react";
import { GoogleIcon } from "../../components/icons";
import { schema } from "./schema/schema";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { register } from "../../store/cases/auth/action";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isOpen: isLoading,
    onClose: closeLoading,
    onOpen: openLoading,
  } = useDisclosure();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      address: "",
      phoneNumber: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        openLoading();
        const res = await dispatch(register(data));
        const { payload } = res;
        closeLoading();
        if (payload.isSuccess) {
          toast.success("REGISTRATION SUCCESS", {
            autoClose: 2000,
          });
          navigate("/login");
        } else {
          toast.error(payload.message);
        }
      } catch (error) {
        closeLoading();
        toast.error(error.message);
      }
    },
    [openLoading, closeLoading, dispatch, navigate]
  );

  return (
    <LayoutAuthentication heading="Sign Up">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <p className="text-register">
        Already have an account?{" "}
        <Link to="/login" className="text-register-link">
          Sign in
        </Link>
      </p>
      <Button variant="outline" className="btn-google" mb={5}>
        <GoogleIcon />
        <span>Sign up with google</span>
      </Button>
      <Button className="link-email" variant="link">
        Or sign up with email
      </Button>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <RegisterForm />
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            className="btn-submit"
            colorScheme="purple"
          >
            Create my account
          </Button>
        </form>
      </FormProvider>
    </LayoutAuthentication>
  );
}

export default Register;
