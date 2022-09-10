import { Avatar, Stack, Typography } from "@mui/material";
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
    <Stack>
      <Stack marginY="1rem">
        <Avatar
          sx={{
            textTransform: "uppercase",
            width: "7rem",
            height: "7rem",
            fontSize: "3rem",
            margin: "0 auto",
          }}
        >
          {data?.getUserById.firstName[0]}
          {data?.getUserById.lastName[0]}
        </Avatar>
        <Typography align="center" fontSize="2rem">
          {data?.getUserById.firstName + " " + data?.getUserById.lastName}
        </Typography>
        <Typography align="center" fontSize="1.4rem">
          ({data?.getUserById.email})
        </Typography>
      </Stack>
      {data?.getUserById.posts.map((post) => (
        <PostTile
          post={{
            ...post,
            user: data?.getUserById,
          }}
        />
      ))}
    </Stack>
  );
};
