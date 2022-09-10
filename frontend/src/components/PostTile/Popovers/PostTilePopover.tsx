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
import { Clear, Details, MoreVert } from "@mui/icons-material";
import {
  DELETE_POST,
  FETCH_POST_BY_ID,
  GetPostById,
} from "../../../graphql/Post";
import jwt_decode from "jwt-decode";
import { Decoded } from "../../../types";

interface PostTilePopoverProps {
  postId: string;
}

export const PostTilePopover = ({ postId }: PostTilePopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { data } = useQuery<GetPostById>(FETCH_POST_BY_ID, {
    variables: { postId: postId },
  });
  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postId: postId,
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
          <ListItemButton onClick={() => navigate(`${data?.getPostById.id}`)}>
            <Details />
            <ListItemText
              primary={t("actions.details")}
              sx={{ marginLeft: "0.5rem" }}
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <Clear />
            <ListItemText
              primary={t("actions.delete")}
              onClick={async () => {
                await deletePost();
                navigate(0);
              }}
              sx={{ marginLeft: "0.5rem" }}
            />
          </ListItemButton>
        </List>
      </Popover>
    </>
  );
};
