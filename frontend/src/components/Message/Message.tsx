import React from "react";
import { Avatar, Box, Typography, useMediaQuery } from "@mui/material";
import { MessagePopulated } from "graphql/Message";
import jwt_decode from "jwt-decode";
import { auth, MD } from "utils";
import { Decoded } from "types";
import { useNavigate } from "react-router-dom";

interface MessageProps {
  message: MessagePopulated;
}

export const Message = ({
  message: {
    content,
    createdAt,
    user: { firstName, lastName, id },
  },
}: MessageProps) => {
  const isCreator = jwt_decode<Decoded>(auth.getToken() || "").userId === id;
  const navigate = useNavigate();
  const matches = useMediaQuery(MD);

  const date = new Date(parseInt(createdAt)).toLocaleTimeString("pl", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box sx={{ display: "flex", justifyContent: isCreator ? "right" : "left" }}>
      {!isCreator && (
        <Avatar
          onClick={() => navigate(`/users/${id}`)}
          sx={{
            cursor: "pointer",
            textTransform: "uppercase",
            marginRight: "1rem",
          }}
        >{`${firstName[0] + lastName[0]}`}</Avatar>
      )}
      {isCreator && (
        <Typography sx={{ margin: "auto 0.2rem" }}>{date}</Typography>
      )}
      <Typography
        sx={{
          backgroundColor: isCreator ? "#1D2A44" : "lightgray",
          maxWidth: matches ? "60%" : "80%",
          width: "fit-content",
          padding: "0.5rem 1rem",
          borderRadius: "1rem",
          color: isCreator ? "white" : "black",
        }}
      >
        {content}
      </Typography>
      {!isCreator && (
        <Typography sx={{ margin: "auto 0.2rem" }}>{date}</Typography>
      )}
    </Box>
  );
};
