import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  COMMENT_POST,
  DELETE_POST,
  FETCH_POST_BY_ID,
  GetPostById,
  LIKE_POST,
} from "graphql/Post";
import { auth, MD } from "utils";
import { FormUpdatePost } from "components";
import { PostDetailsPopover } from "../components/PostTile/Popovers";
import { Comment, Recommend, ThumbUp } from "@mui/icons-material";
import { UserComment } from "../components/Comment";
import useTranslation from "../translations/hooks/useTranslations";
import jwt_decode from "jwt-decode";
import { Decoded } from "../types";

export const PostDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const matches = useMediaQuery(MD);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState<string>("");
  const [commentMode, setCommentMode] = useState<boolean>(true);
  const { t } = useTranslation();

  const { data, refetch } = useQuery<GetPostById>(FETCH_POST_BY_ID, {
    variables: { postId: params.postId },
  });

  const [likePost] = useMutation(LIKE_POST, {
    variables: {
      postId: params.postId,
    },
  });

  const [commentPost] = useMutation(COMMENT_POST, {
    variables: {
      postId: params.postId,
      content,
    },
  });

  const isLiked = data?.getPostById.likes.find(
    (like) => like.id === jwt_decode<Decoded>(auth.getToken() || "").userId
  );

  const handleComment = async () => {
    if (content) {
      await commentPost();
      await refetch({
        variables: {
          postId: params.postId,
        },
      });
      setContent("");
    }
  };

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
        {!editMode && <PostDetailsPopover setEditMode={setEditMode} />}
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
          <Stack flexDirection="row">
            <Stack>
              <Stack flexDirection="row">
                <Recommend />
                <Typography>{data?.getPostById.likes.length}</Typography>
              </Stack>
              <Stack flexDirection="row">
                <Button
                  variant={isLiked ? "contained" : "text"}
                  onClick={async () => {
                    await likePost();
                    await refetch({
                      variables: { postId: params.postId },
                    });
                  }}
                >
                  <ThumbUp />
                  <Typography sx={{ marginLeft: "0.5rem" }}>
                    {" "}
                    {t("actions.like")}
                  </Typography>
                </Button>
              </Stack>
            </Stack>
            <Stack>
              <Typography lineHeight="1.5rem">
                0 {t("post.comment", 10)}
              </Typography>
              <Stack flexDirection="row">
                <Button onClick={() => setCommentMode(!commentMode)}>
                  <Comment />
                  <Typography sx={{ marginLeft: "0.5rem" }}>
                    {" "}
                    {t("actions.comment")}
                  </Typography>
                </Button>
              </Stack>
            </Stack>
          </Stack>
          {commentMode && (
            <Stack
              sx={{
                border: "1px solid lightgray",
                borderRadius: "0.5rem",
                padding: "1rem",
                marginTop: "1rem",
              }}
            >
              {data?.getPostById.comments.map((comment) => (
                <UserComment comment={comment} />
              ))}
              <Box sx={{ width: "100%", display: "flex", margin: "0.5rem 0" }}>
                <TextField
                  sx={{ width: "100%" }}
                  variant="standard"
                  color="primary"
                  value={content}
                  placeholder={t("actions.typeMessage")}
                  focused
                  onChange={(event) => setContent(event.target.value)}
                  multiline
                />
                <Button sx={{ marginLeft: "1rem" }} onClick={handleComment}>
                  {t("actions.comment")}
                </Button>
              </Box>
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};
