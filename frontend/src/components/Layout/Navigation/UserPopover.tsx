import {
  Typography,
  Popover,
  Button,
  Avatar,
  Box,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import { useQuery } from "@apollo/client";
import { Authorization, VERIFY } from "../../../graphql";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../utils/auth";

export const UserPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { data } = useQuery<Authorization>(VERIFY);
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
        <List
          sx={{ minWidth: "10rem" }}
          component="nav"
          aria-label="mailbox folders"
        >
          <ListItemButton disabled={true}>
            <ListItemText primary="Profile" />
          </ListItemButton>
          <Divider />
          <ListItemButton divider disabled>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton>
            {data?.verify.isAuthorized ? (
              <ListItemText
                primary="Logout"
                onClick={() => {
                  auth.logout();
                  navigate("logout");
                }}
              />
            ) : (
              <ListItemText
                primary="Login"
                onClick={() => navigate("signin")}
              />
            )}
          </ListItemButton>
        </List>
      </Popover>
    </>
  );
};
