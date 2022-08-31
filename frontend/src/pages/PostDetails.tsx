import React from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FETCH_POST_BY_ID, GetPostByIdQuery } from "../graphql";

export const PostDetails = () => {
  const params = useParams();
  const { data } = useQuery<GetPostByIdQuery>(FETCH_POST_BY_ID, {
    variables: { postId: params.postId },
  });

  return (
    <Box>
      <Typography> POST DETAILS</Typography>
      <Typography>PostId: {data?.getPostById.id}</Typography>
      <Typography>Title: {data?.getPostById.title}</Typography>
      <Typography>Description: {data?.getPostById.description}</Typography>
      <Typography>ImageUrl: {data?.getPostById.imageUrl}</Typography>
      <Typography>
        Creator First Name: {data?.getPostById.user.firstName}
      </Typography>
      <Typography>
        Creator Last Name: {data?.getPostById.user.lastName}
      </Typography>
    </Box>
  );
};
