import React, { FC } from "react";
import { PostPopulated } from "../../graphql/types";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_POST_MUTATION } from "../../graphql";
import { Clear } from "@mui/icons-material";
import { auth, Decoded } from "../../utils";
import jwt_decode from "jwt-decode";

interface PostTileProps {
  post: PostPopulated;
}

export const PostTile: FC<PostTileProps> = ({
  post: { title, description, imageUrl, user, createdAt, id },
}) => {
  const navigate = useNavigate();
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      postId: id,
    },
  });

  return (
    <Box sx={{ border: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/users/${user.id}`)}
        >
          User: {`${user.firstName} ${user.lastName}`}
        </Typography>
        {jwt_decode<Decoded>(auth.getToken() || "").userId === user.id && (
          <Box>
            <Clear
              sx={{ cursor: "pointer" }}
              onClick={() => {
                deletePost();
                navigate(0);
              }}
            />
          </Box>
        )}
      </Box>
      <Typography
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/posts/${id}`)}
      >
        Title: {title}
      </Typography>
      <Typography>Description: {description}</Typography>
      <Typography>
        CreatedAt: {new Date(parseInt(createdAt)).toString()}
      </Typography>
      <img src={imageUrl} style={{ maxWidth: "40rem", maxHeight: "40rem" }} />
    </Box>
  );
};
