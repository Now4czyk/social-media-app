import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Message } from "components";
import { useMutation, useSubscription } from "@apollo/client";
import {
  CREATE_MESSAGE,
  GetAllMessages,
  FETCH_MESSAGES,
} from "graphql/Message";
import useTranslation from "../translations/hooks/useTranslations";

export const Forum = () => {
  const [content, setContent] = useState<string>("");
  const { data } = useSubscription<GetAllMessages>(FETCH_MESSAGES);
  const { t } = useTranslation();

  const [createMessage] = useMutation(CREATE_MESSAGE, {
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
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 500, marginY: "1rem" }}>
        {t("tabs.forum")} : {t("messages.forumDescription")}
      </Typography>
      <Box>
        <Box
          sx={{
            maxHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
            overflowY: "scroll",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid lightgray",
          }}
        >
          {data?.getAllMessages.map((message) => (
            <Message message={message} />
          ))}
        </Box>
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
          <Button sx={{ marginLeft: "1rem" }} onClick={() => sendMessage()}>
            {t("actions.send")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
