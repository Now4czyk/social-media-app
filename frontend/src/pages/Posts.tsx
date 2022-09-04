import { Box, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { FETCH_POSTS, GetAllPosts } from "graphql/Post";
import { PostTile, FormCreatePost } from "components";

export const Posts = () => {
  const { data } = useQuery<GetAllPosts>(FETCH_POSTS);

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
