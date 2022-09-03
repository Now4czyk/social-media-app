import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_POST_MUTATION,
  FETCH_POST_BY_ID,
  GetPostByIdQuery,
} from "../graphql";
import jwt_decode from "jwt-decode";
import { auth, Decoded } from "../utils";
import { Clear } from "@mui/icons-material";

export const PostDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data } = useQuery<GetPostByIdQuery>(FETCH_POST_BY_ID, {
    variables: { postId: params.postId },
  });
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      deletePostId: params.postId,
    },
  });

  return (
    <Box>
      {" "}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography> POST DETAILS</Typography>
        {jwt_decode<Decoded>(auth.getToken() || "").userId ===
          data?.getPostById.user.id && (
          <Clear
            sx={{ cursor: "pointer" }}
            onClick={() => {
              deletePost();
              navigate(0);
            }}
          />
        )}
      </Box>
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
