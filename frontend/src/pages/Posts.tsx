import { Box, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { FETCH_POSTS, GetAllPosts } from "graphql/Post";
import { PostTile, FormCreatePost } from "components";
import useTranslation from "../translations/hooks/useTranslations";

export const Posts = () => {
  const { data } = useQuery<GetAllPosts>(FETCH_POSTS);
  const { t } = useTranslation();

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography>{t("actions.createPost")}</Typography>
      <FormCreatePost />
      {data?.getAllPosts.map((post) => (
        <PostTile post={post} />
      ))}
    </Box>
  );
};
