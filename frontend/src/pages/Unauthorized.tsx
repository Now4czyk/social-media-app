import useTranslation from "../translations/hooks/useTranslations";

export const Unauthorized = () => {
  const { t } = useTranslation();

  return <div>{t("messages.unauthorized")}</div>;
};
