import { Avatar, Stack, Typography } from "@mui/material";

export const UserComment = () => {
  return (
    <Stack>
      <Stack flexDirection="row">
        <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} />
        <Typography sx={{ marginLeft: "0.5rem", fontWeight: 500 }}>
          Jan Kowalski
        </Typography>
      </Stack>
      <Typography sx={{ marginLeft: "2rem" }}>super!!</Typography>
    </Stack>
  );
};
