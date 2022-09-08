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
      <Typography>{t("tabs.forum")}</Typography>
      <Typography>{t("messages.forumDescription")}</Typography>
      <Box>
        <Box
          sx={{
            maxHeight: "50rem",
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
            overflowY: "scroll",
          }}
        >
          {data?.getAllMessages.map((message) => (
            <Message message={message} />
          ))}
        </Box>
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
            {t("actions.send")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
