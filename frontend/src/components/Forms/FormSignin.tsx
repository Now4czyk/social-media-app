import { Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "./utils";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SINGIN_USER } from "graphql/User";
import { auth } from "utils";
import useTranslation from "../../translations/hooks/useTranslations";

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
  const { t } = useTranslation();
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
        width: "20rem",
      }}
    >
      <FormInputText
        name="email"
        type="email"
        control={control}
        label={t("user.email")}
      />
      <FormInputText
        name="password"
        type="password"
        control={control}
        label={t("form.password")}
      />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        {t("actions.signin")}
      </Button>
      <Typography sx={{ fontSize: "0.9rem", textAlign: "center" }}>
        {t("messages.newUser")}&nbsp;
        <Link to="/signup">{t("actions.signup")}</Link>
      </Typography>
    </Box>
  );
};
