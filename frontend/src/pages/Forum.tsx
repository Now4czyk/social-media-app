import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Message } from "../components";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_MESSAGE_MUTATION,
  FETCH_MESSAGES,
  GetAllMessagesQuery,
} from "../graphql";

export const Forum = () => {
  const [content, setContent] = useState<string>("");
  const { data } = useQuery<GetAllMessagesQuery>(FETCH_MESSAGES);
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION, {
    onCompleted: () => {
      setContent("");
    },
  });

  const sendMessage = async () => {
    if (content) {
      await createMessage({
        variables: {
          content,
        },
      });
    }
  };

  return (
    <Box>
      <Typography> FORUM Here you can discuss your ideas</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
        {data?.getAllMessages.map((message) => (
          <Message message={message} />
        ))}
        <Box sx={{ width: "100%", display: "flex" }}>
          <TextField
            sx={{ width: "100%" }}
            variant="standard"
            color="primary"
            value={content}
            placeholder="Type message"
            focused
            onChange={(event) => setContent(event.target.value)}
          />
          <Button sx={{ marginLeft: "5rem" }} onClick={() => sendMessage()}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
