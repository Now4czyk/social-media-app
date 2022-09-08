import { useQuery } from "@apollo/client";
import { FETCH_USERS, GetAllUsers } from "graphql/User";
import { Box, CircularProgress, Typography } from "@mui/material";
import useTranslation from "../translations/hooks/useTranslations";

export const Users = () => {
  const { loading, data } = useQuery<GetAllUsers>(FETCH_USERS);
  const { t } = useTranslation();

  return (
    <Box>
      <Typography>{t("tabs.users")}</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        data?.getAllUsers.map((user) => (
          <>
            {user.email}
            <br />
          </>
        ))
      )}
    </Box>
  );
};
