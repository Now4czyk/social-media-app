import { Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "./utils/FormInputText";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "graphql/User";
import useTranslation from "translations/hooks/useTranslations";

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

export const FormSignup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const methods = useForm<FormInputs>({ defaultValues });
  const { handleSubmit, control, setError, formState } = methods;

  const [createUser] = useMutation(CREATE_USER, {
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
      setError("firstName", { message: t("errors.firstName") });
    if (lastName.length === 0)
      setError("lastName", { message: t("errors.lastName") });
    if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    )
      setError("email", { message: "Email is invalid" });
    if (password.length <= 5)
      setError("password", {
        message: t("errors.password"),
      });
    if (password !== confirmPassword) {
      setError("password", {
        message: t("errors.passwords"),
      });
      setError("confirmPassword", {
        message: t("errors.passwords"),
      });
    }

    if (formState.isSubmitSuccessful) {
      await createUser({
        variables: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
      });
    }
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
        name="firstName"
        control={control}
        label={t("user.firstName")}
      />
      <FormInputText
        name="lastName"
        control={control}
        label={t("user.lastName")}
      />
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
      <FormInputText
        name="confirmPassword"
        type="password"
        control={control}
        label={t("form.confirmPassword")}
      />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        {t("actions.signup")}
      </Button>
      <Typography sx={{ fontSize: "0.9rem", textAlign: "center" }}>
        {t("messages.alreadyUser")}&nbsp;
        <Link to="/signin">{t("actions.signin")}</Link>{" "}
      </Typography>
    </Box>
  );
};
