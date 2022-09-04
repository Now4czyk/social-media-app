import { useLocation } from "react-router-dom";
import { FormControl } from "@mui/material";
import { FormSignup, FormSignin } from "components";

export const Authentication = () => {
  const isSignIn = useLocation().pathname.includes("signin");
  const Form = () => (isSignIn ? <FormSignin /> : <FormSignup />);

  return (
    <FormControl>
      <Form />
    </FormControl>
  );
};
