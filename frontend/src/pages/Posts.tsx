import { Box, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { FETCH_POSTS, GetAllPosts } from "graphql/Post";
import { PostTile, FormCreatePost } from "components";
import useTranslation from "../translations/hooks/useTranslations";
import { Pagination } from "components/Pagination/Pagination";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Params {
  perPage: number;
  page: number;
}

export const Posts = () => {
  const { data } = useQuery<GetAllPosts>(FETCH_POSTS);
  const { t } = useTranslation();
  const [params, setParams] = useState({
    perPage: 5,
    page: 1,
  });

  const onPaginationChange = (
    e: ChangeEvent<{ perPage: number; page: number }>
  ) => setParams(e.target);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography>{t("actions.createPost")}</Typography>
      <FormCreatePost />
      <Pagination
        perPage={params.perPage}
        total={data?.getAllPosts.length || 1}
        onChange={onPaginationChange}
      />
      {data?.getAllPosts.map((post) => (
        <PostTile post={post} />
      ))}
    </Box>
  );
};
