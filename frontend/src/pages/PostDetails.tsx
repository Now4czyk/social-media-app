import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_POST, FETCH_POST_BY_ID, GetPostById } from "graphql/Post";
import jwt_decode from "jwt-decode";
import { auth } from "utils";
import { Decoded } from "types";
import { Clear, Edit } from "@mui/icons-material";
import { FormUpdatePost } from "components";
import useTranslation from "../translations/hooks/useTranslations";

export const PostDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation();

  const { data } = useQuery<GetPostById>(FETCH_POST_BY_ID, {
    variables: { postId: params.postId },
  });
  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postId: params.postId,
    },
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>{t("messages.postDetails")}</Typography>
        {jwt_decode<Decoded>(auth.getToken() || "").userId ===
          data?.getPostById.user.id && (
          <Box>
            {!editMode && <Edit onClick={() => setEditMode(true)} />}
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
      {editMode ? (
        <FormUpdatePost
          defaultValues={{
            title: data?.getPostById.title || "",
            description: data?.getPostById.description || "",
            imageUrl: data?.getPostById.imageUrl || "",
          }}
          setEditMode={setEditMode}
        />
      ) : (
        <>
          <Typography>
            {t("post.title")}: {data?.getPostById.title}
          </Typography>
          <Typography>
            {t("post.description")}: {data?.getPostById.description}
          </Typography>
          <Typography>
            {t("post.image")}: {data?.getPostById.imageUrl}
          </Typography>
          <Typography>
            {t("user.firstName")}: {data?.getPostById.user.firstName}
          </Typography>
          <Typography>
            {t("user.lastName")}: {data?.getPostById.user.lastName}
          </Typography>
        </>
      )}
    </Box>
  );
};
