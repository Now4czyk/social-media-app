import {
  Popover,
  Avatar,
  Box,
  List,
  Divider,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import { useQuery } from "@apollo/client";
import { VERIFY, Verification } from "graphql/Authorization";
import { useNavigate } from "react-router-dom";
import { auth } from "utils/auth";
import useTranslation from "translations/hooks/useTranslations";
import { Login, Logout, Person } from "@mui/icons-material";

export const PostDetails = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { data } = useQuery<Verification>(VERIFY);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Box sx={{ marginY: "auto" }} onClick={handleClick} aria-describedby={id}>
        <Avatar sx={{ cursor: "pointer" }} />
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
          {data?.verify.isAuthorized ? (
            <>
              <ListItemButton>
                <Person />
                <ListItemText
                  primary={t("tabs.profile")}
                  onClick={() => navigate("profile")}
                />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <Logout />
                <ListItemText
                  primary={t("actions.logout")}
                  onClick={() => {
                    auth.logout();
                    navigate("logout");
                    navigate(0);
                  }}
                />
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton>
                <Login />
                <ListItemText
                  primary={t("actions.signin")}
                  onClick={() => navigate("signin")}
                />
              </ListItemButton>
            </>
          )}
        </List>
      </Popover>
    </>
  );
};
