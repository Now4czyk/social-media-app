import { Avatar, Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FETCH_USER_BY_ID, GetUserById } from "graphql/User";
import { PostTile } from "components";
import useTranslation from "../translations/hooks/useTranslations";

export const UserDetails = () => {
  const params = useParams();
  const { data } = useQuery<GetUserById>(FETCH_USER_BY_ID, {
    variables: { userId: params.userId },
  });
  const { t } = useTranslation();

  return (
    <Box>
      <Typography>{t("messages.userDetails")}</Typography>
      <Avatar />
      <Typography>
        {t("user.firstName")}: {data?.getUserById.firstName}
      </Typography>
      <Typography>
        {t("user.lastName")}: {data?.getUserById.lastName}
      </Typography>
      <Typography>
        {t("user.email")}: {data?.getUserById.email}
      </Typography>
      <Typography>
        {t("post.createdAt")}:
        {" " + new Date(parseInt(data?.getUserById.createdAt || "")).toString()}
      </Typography>
      <Typography>
        {t("post.updatedAt")}:
        {" " + new Date(parseInt(data?.getUserById.updatedAt || "")).toString()}
      </Typography>
      {data?.getUserById.posts.map((post) => (
        <PostTile
          post={{
            ...post,
            user: {
              email: data?.getUserById.email,
              firstName: data?.getUserById.firstName,
              lastName: data?.getUserById.lastName,
              id: data?.getUserById.id,
              createdAt: data?.getUserById.createdAt,
              updatedAt: data?.getUserById.updatedAt,
            },
          }}
        />
      ))}
    </Box>
  );
};
