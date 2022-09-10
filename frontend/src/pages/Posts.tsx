import { Box, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { FETCH_POSTS_PAGINATION, GetPostsPagination } from "graphql/Post";
import { PostTile, FormCreatePost } from "components";
import { Pagination } from "components/Pagination/Pagination";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface Params {
  perPage: number;
  page: number;
}

export const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<Params>({
    perPage: parseInt(searchParams.get("perPage") || "2"),
    page: parseInt(searchParams.get("page") || "1"),
  });
  const { data } = useQuery<GetPostsPagination>(FETCH_POSTS_PAGINATION, {
    variables: {
      perPage: params.perPage,
      page: params.page,
    },
  });

  useEffect(() => {
    !searchParams.get("page") && setSearchParams({ perPage: "2", page: "1" });
  }, []);

  const onPaginationChange = (e: ChangeEvent<Params>) => setParams(e.target);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography></Typography>
      <FormCreatePost />
      <Pagination
        params={params}
        total={data?.getPostsPagination.total || 1}
        onChange={onPaginationChange}
      >
        {data?.getPostsPagination.posts.map((post) => (
          <PostTile key={post.id} post={post} />
        ))}
      </Pagination>
    </Box>
  );
};
