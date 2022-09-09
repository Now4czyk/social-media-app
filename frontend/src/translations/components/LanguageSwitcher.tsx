import { Select, MenuItem } from "@mui/material";
import { locales } from "../config";
import { useStore } from "store";
import { Locale } from "../types";

export const LanguageSwitcher = () => {
  const { localization, changeLocale } = useStore();

  return (
    <Select
      value={localization.locale}
      onChange={(e) => changeLocale(e.target.value as Locale)}
      sx={{
        height: "2.4rem",
        width: "3rem",
        marginY: "auto",
        color: "white",
      }}
      variant="standard"
    >
      {locales.map((locale) => (
        <MenuItem value={locale} sx={{ width: "4rem" }}>
          {locale}
        </MenuItem>
      ))}
    </Select>
  );
};
