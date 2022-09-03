import { Avatar, Box, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { FETCH_USER, GetUserQuery } from "../graphql";

export const Profile = () => {
  const { data } = useQuery<GetUserQuery>(FETCH_USER);

  return (
    <Box>
      <Typography>PROFILE</Typography>
      <Avatar />
      <Typography>First Name: {data?.getUser.firstName}</Typography>
      <Typography>Last Name: {data?.getUser.lastName}</Typography>
      <Typography>Email: {data?.getUser.email}</Typography>
      <Typography>
        Created at:
        {" " + new Date(parseInt(data?.getUser.createdAt || "")).toString()}
      </Typography>
      <Typography>
        Updated at:
        {" " + new Date(parseInt(data?.getUser.updatedAt || "")).toString()}
      </Typography>
    </Box>
  );
};
