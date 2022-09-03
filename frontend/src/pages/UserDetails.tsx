import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FETCH_USER_BY_ID, GetUserByIdQuery } from "../graphql";
import { PostTile } from "../components/PostTile";

export const UserDetails = () => {
  const params = useParams();
  const { data } = useQuery<GetUserByIdQuery>(FETCH_USER_BY_ID, {
    variables: { userId: params.userId },
  });

  return (
    <Box>
      <Typography>USER DETAILS</Typography>
      <Avatar />
      <Typography>First Name: {data?.getUserById.firstName}</Typography>
      <Typography>Last Name: {data?.getUserById.lastName}</Typography>
      <Typography>Email: {data?.getUserById.email}</Typography>
      <Typography>
        Created at:
        {" " + new Date(parseInt(data?.getUserById.createdAt || "")).toString()}
      </Typography>
      <Typography>
        Updated at:
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
