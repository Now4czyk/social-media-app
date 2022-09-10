import { Avatar, Stack, Typography } from "@mui/material";
import { CommentPopulated } from "../../graphql/Comment";

interface UserCommentProps {
  comment: CommentPopulated;
}

export const UserComment = ({ comment }: UserCommentProps) => {
  return (
    <Stack>
      <Stack flexDirection="row">
        <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} />
        <Typography sx={{ marginLeft: "0.5rem", fontWeight: 500 }}>
          {comment.user.firstName + " " + comment.user.lastName}
        </Typography>
        <Typography sx={{ marginLeft: "0.5rem" }}>
          {new Date(parseInt(comment.createdAt)).toLocaleTimeString("pl", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Stack>
      <Typography sx={{ marginLeft: "2rem" }}>{comment.content}</Typography>
    </Stack>
  );
};
