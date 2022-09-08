import { FC } from "react";
import { PostPopulated } from "graphql/Post";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "graphql/Post";
import { Clear } from "@mui/icons-material";
import { auth } from "utils";
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
  const { t } = useTranslation();
  const [deletePost] = useMutation(DELETE_POST, {
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
          {t("user.user")}: {`${user.firstName} ${user.lastName}`}
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
        {t("post.title")}: {title}
      </Typography>
      <Typography>
        {t("post.description")}: {description}
      </Typography>
      <Typography>
        {t("post.createdAt")}: {new Date(parseInt(createdAt)).toString()}
      </Typography>
      <img src={imageUrl} style={{ maxWidth: "40rem", maxHeight: "40rem" }} />
    </Box>
  );
};
