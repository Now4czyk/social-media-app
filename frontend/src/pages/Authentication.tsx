import React from "react";
import { useLocation } from "react-router-dom";
import { Signin, Signup } from "components";
import { FormControl } from "@mui/material";

const Authentication = () => {
  const isSignIn = useLocation().pathname.includes("signin");
  const Form = () => (isSignIn ? <Signin /> : <Signup />);

  return (
    <FormControl>
      <Form />
    </FormControl>
  );
};

export default Authentication;
