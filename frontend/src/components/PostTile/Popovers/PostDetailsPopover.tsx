import {
  Popover,
  Box,
  List,
  Divider,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "utils/auth";
import useTranslation from "translations/hooks/useTranslations";
import { Clear, Edit, MoreVert } from "@mui/icons-material";
import {
  DELETE_POST,
  FETCH_POST_BY_ID,
  GetPostById,
} from "../../../graphql/Post";
import jwt_decode from "jwt-decode";
import { Decoded } from "../../../types";

interface PostPopoverProps {
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

export const PostDetailsPopover = ({ setEditMode }: PostPopoverProps) => {
  const params = useParams();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { data } = useQuery<GetPostById>(FETCH_POST_BY_ID, {
    variables: { postId: params.postId },
  });
  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postId: params.postId,
    },
  });

  const isUsersPost =
    jwt_decode<Decoded>(auth.getToken() || "").userId ===
    data?.getPostById.user.id;

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Box sx={{ marginY: "auto" }} onClick={handleClick} aria-describedby={id}>
        <MoreVert sx={{ cursor: "pointer" }} />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List sx={{ minWidth: "10rem" }} component="nav">
          <ListItemButton
            disabled={!isUsersPost}
            onClick={() => setEditMode(true)}
          >
            <Edit />
            <ListItemText
              primary={t("actions.edit")}
              sx={{ marginLeft: "0.5rem" }}
            />
          </ListItemButton>
          <Divider />
          <ListItemButton disabled={!isUsersPost}>
            <Clear />
            <ListItemText
              primary={t("actions.delete")}
              onClick={() => {
                deletePost();
                navigate("/posts");
              }}
              sx={{ marginLeft: "0.5rem" }}
            />
          </ListItemButton>
        </List>
      </Popover>
    </>
  );
};
