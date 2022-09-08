import { Typography } from "@mui/material";
import useTranslation from "../translations/hooks/useTranslations";

export const Logout = () => {
  const { t } = useTranslation();

  return <Typography>{t("messages.logoutDescription")}</Typography>;
};
