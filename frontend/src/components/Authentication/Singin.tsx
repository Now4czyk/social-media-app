import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "../Form/FormInputText";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { SINGIN_USER_MUTATION } from "graphql/Mutations";
import { auth } from "../../utils/auth";

interface FormInputs {
  email: string;
  password: string;
}

const defaultValues: FormInputs = {
  email: "",
  password: "",
};

export const Signin = () => {
  const navigate = useNavigate();
  const methods = useForm<FormInputs>({ defaultValues });
  const { handleSubmit, control, setError } = methods;

  const [login, { error }] = useMutation(SINGIN_USER_MUTATION, {
    // onCompleted: () => navigate("/home"),
  });

  const onSubmit = async ({ password, email }: FormInputs) => {
    const authData = await login({
      variables: {
        email,
        password,
      },
    });

    auth.login(authData.data.login.token);

    if (error) {
      console.log("SIGNIN ERROR");
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
      <FormInputText name="email" control={control} label="Email" />
      <FormInputText name="password" control={control} label="Password" />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Sign in
      </Button>
      <Typography sx={{ fontSize: "0.9rem" }}>
        New to Boring App? <Link to="/signup">Sing up</Link>
      </Typography>
    </Box>
  );
};
