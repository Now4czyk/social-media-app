import { useState } from "react";
import { Avatar, Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_POST, FETCH_POST_BY_ID, GetPostById } from "graphql/Post";
import jwt_decode from "jwt-decode";
import { auth, MD } from "utils";
import { Decoded } from "types";
import { Clear, Edit } from "@mui/icons-material";
import { FormUpdatePost } from "components";

export const PostDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const matches = useMediaQuery(MD);
  const [editMode, setEditMode] = useState(false);

  const { data } = useQuery<GetPostById>(FETCH_POST_BY_ID, {
    variables: { postId: params.postId },
  });
  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postId: params.postId,
    },
  });

  return (
    <Stack
      justifyContent="space-between"
      border="1px solid lightgray"
      borderRadius="0.5rem"
      marginY="1rem"
      padding="2rem"
    >
      <Stack flexDirection="row" justifyContent="space-between">
        <Stack flexDirection="row">
          <Avatar sx={{ height: "2rem", width: "2rem" }} />
          <Typography
            sx={{
              cursor: "pointer",
              lineHeight: "2rem",
              marginLeft: "0.3rem",
              fontWeight: "500",
            }}
            onClick={() => navigate(`/users/${data?.getPostById.user.id}`)}
          >
            {`${data?.getPostById.user.firstName} ${data?.getPostById.user.lastName}`}
          </Typography>
        </Stack>
        {jwt_decode<Decoded>(auth.getToken() || "").userId ===
          data?.getPostById.user.id && (
          <Box>
            {!editMode && (
              <>
                <Edit onClick={() => setEditMode(true)} />
                <Clear
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    deletePost();
                    navigate(0);
                  }}
                />
              </>
            )}
          </Box>
        )}
      </Stack>

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
          <Typography
            sx={{
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1.5rem",
              marginTop: "0.5rem",
            }}
          >
            {data?.getPostById.title}
          </Typography>
          <Typography align="justify">
            {data?.getPostById.description}
          </Typography>
          <Stack alignItems="center">
            <img
              src={data?.getPostById.imageUrl}
              style={{
                maxWidth: matches ? "40rem" : "20rem",
                marginTop: "1rem",
                maxHeight: matches ? "40rem" : "20rem",
              }}
            />
          </Stack>
        </>
      )}
    </Stack>
  );
};
