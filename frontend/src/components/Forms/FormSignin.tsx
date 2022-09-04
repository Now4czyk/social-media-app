import { Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "./utils";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SINGIN_USER } from "graphql/User";
import { auth } from "utils";

interface FormInputs {
  email: string;
  password: string;
}

const defaultValues: FormInputs = {
  email: "",
  password: "",
};

export const FormSignin = () => {
  const navigate = useNavigate();
  const methods = useForm<FormInputs>({ defaultValues });
  const { handleSubmit, control } = methods;

  const [login] = useMutation(SINGIN_USER);

  const onSubmit = async ({ password, email }: FormInputs) => {
    const authData = await login({
      variables: {
        email,
        password,
      },
    });

    auth.login(authData.data.login.token);
    navigate("/posts");
    navigate(0);
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
      <FormInputText
        name="email"
        type="email"
        control={control}
        label="Email"
      />
      <FormInputText
        name="password"
        type="password"
        control={control}
        label="Password"
      />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Sign in
      </Button>
      <Typography sx={{ fontSize: "0.9rem" }}>
        New to Boring App? <Link to="/signup">Sing up</Link>
      </Typography>
    </Box>
  );
};
