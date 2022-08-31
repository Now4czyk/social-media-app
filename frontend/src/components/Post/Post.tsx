import React, { FC } from "react";
import { PostPopulated } from "../../graphql/types";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface PostTileProps {
  post: PostPopulated;
}

export const PostTile: FC<PostTileProps> = ({
  post: { title, description, imageUrl, user, createdAt, id },
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ border: 1 }}>
      <Typography
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/users/${user.id}`)}
      >
        User: {`${user.firstName} ${user.lastName}`}
      </Typography>
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
