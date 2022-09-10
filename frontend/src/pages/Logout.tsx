import { Stack, Typography } from "@mui/material";
import useTranslation from "../translations/hooks/useTranslations";
import { Link } from "react-router-dom";

export const Logout = () => {
  const { t } = useTranslation();

  return (
    <Stack flexDirection="row">
      <Typography>{t("messages.logoutDescription")}.&nbsp;</Typography>
      <Link to={"/signin"}>{t("actions.signin")}</Link>
    </Stack>
  );
};
