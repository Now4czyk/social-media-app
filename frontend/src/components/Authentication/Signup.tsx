import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "../Form/FormInputText";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../graphql/Mutations";

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: FormInputs = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const Signup = () => {
  const navigate = useNavigate();
  const methods = useForm<FormInputs>({ defaultValues });
  const { handleSubmit, control, setError, formState } = methods;

  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => navigate("/signin"),
  });

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }: FormInputs) => {
    if (firstName.length === 0)
      setError("firstName", { message: "First name is invalid" });
    if (lastName.length === 0)
      setError("lastName", { message: "Last name is invalid" });
    if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    )
      setError("email", { message: "Email is invalid" });
    if (password.length <= 5)
      setError("password", {
        message: "Password should  have more than 5 characters",
      });
    if (password !== confirmPassword) {
      setError("password", {
        message: "Passwords should be identical",
      });
      setError("confirmPassword", {
        message: "Password should be identical",
      });
    }

    if (formState.isSubmitSuccessful) {
      const user = await createUser({
        variables: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
      });
      console.log("user");
      console.log(user);
    }

    if (error) {
      console.log("SIGNUP ERROR");
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        marginTop: "1rem",
        width: "15rem",
      }}
    >
      <FormInputText name="firstName" control={control} label="First name" />
      <FormInputText name="lastName" control={control} label="Last name" />
      <FormInputText name="email" control={control} label="Email" />
      <FormInputText name="password" control={control} label="Password" />
      <FormInputText
        name="confirmPassword"
        control={control}
        label="Confirm password"
      />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Sign up
      </Button>
      <Typography sx={{ fontSize: "0.9rem" }}>
        Already have an account? <Link to="/signin">Sing in</Link>{" "}
      </Typography>
    </Box>
  );
};
