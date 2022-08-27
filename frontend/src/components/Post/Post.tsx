import React, { FC } from "react";
import { Post } from "../../graphql/types";
import { Box, Typography } from "@mui/material";

interface PostTileProps {
  post: Post;
}

export const PostTile: FC<PostTileProps> = ({
  post: { title, description, imageUrl, userId, createdAt },
}) => {
  return (
    <Box sx={{ border: 1 }}>
      <Typography>User: {userId}</Typography>
      <Typography>Title: {title}</Typography>
      <Typography>Description: {description}</Typography>
      <Typography>
        CreatedAt: {new Date(parseInt(createdAt)).toString()}
      </Typography>
      <img src={imageUrl} style={{ maxWidth: "40rem", maxHeight: "40rem" }} />
    </Box>
  );
};
