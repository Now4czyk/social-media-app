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
import { AuthorizationQuery, VERIFY } from "../../../graphql";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "utils/auth";

export const UserPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { data } = useQuery<AuthorizationQuery>(VERIFY);
  const navigate = useNavigate();
  const location = useLocation();

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
          <ListItemButton>
            <ListItemText
              primary="Profile"
              onClick={() => navigate("profile")}
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            {data?.verify.isAuthorized ? (
              <ListItemText
                primary="Logout"
                onClick={() => {
                  auth.logout();
                  navigate("logout");
                  navigate(0);
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
