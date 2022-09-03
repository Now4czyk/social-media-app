import React from "react";
import { Box, Typography } from "@mui/material";
import { FormCreatePost } from "../components/Forms/FormCreatePost";
import { useQuery } from "@apollo/client";
import { FETCH_POSTS, GetAllPostsQuery } from "../graphql";
import { PostTile } from "../components/PostTile";

export const Posts = () => {
  const { data } = useQuery<GetAllPostsQuery>(FETCH_POSTS);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography>Add a post</Typography>
      <FormCreatePost />
      {data?.getAllPosts.map((post) => (
        <PostTile post={post} />
      ))}
    </Box>
  );
};
