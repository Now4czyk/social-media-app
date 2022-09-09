import { FC } from "react";
import { PostPopulated } from "graphql/Post";
import { Avatar, Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "graphql/Post";
import { Clear } from "@mui/icons-material";
import { auth, MD } from "utils";
import { Decoded } from "types";
import jwt_decode from "jwt-decode";
import useTranslation from "translations/hooks/useTranslations";

interface PostTileProps {
  post: PostPopulated;
}

export const PostTile: FC<PostTileProps> = ({
  post: { title, description, imageUrl, user, createdAt, id },
}) => {
  const navigate = useNavigate();
  const matches = useMediaQuery(MD);
  const { t } = useTranslation();
  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postId: id,
    },
  });

  return (
    <Box
      sx={{
        border: "1px solid lightgray",
        borderRadius: "0.5rem",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <Stack justifyContent="space-between" flexDirection="row">
        <Stack flexDirection="row">
          <Avatar sx={{ height: "2rem", width: "2rem" }} />
          <Typography
            sx={{
              cursor: "pointer",
              lineHeight: "2rem",
              marginLeft: "0.3rem",
              fontWeight: "500",
            }}
            onClick={() => navigate(`/users/${user.id}`)}
          >
            {`${user.firstName} ${user.lastName}`}
          </Typography>
        </Stack>
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
      </Stack>
      <Typography
        sx={{
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "1.5rem",
          marginTop: "0.5rem",
        }}
        onClick={() => navigate(`/posts/${id}`)}
      >
        {title}
      </Typography>
      <Typography align="justify">{description}</Typography>
      <Typography>
        {t("post.createdAt")}: {new Date(parseInt(createdAt)).toString()}
      </Typography>
      <Stack alignItems="center">
        <img
          src={imageUrl}
          style={{
            maxWidth: matches ? "40rem" : "20rem",
            marginTop: "1rem",
            maxHeight: matches ? "40rem" : "20rem",
          }}
        />
      </Stack>
    </Box>
  );
};
