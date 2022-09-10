import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { FETCH_USER, GetUser } from "graphql/User";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import { FormUpdateUser } from "components";
import useTranslation from "../translations/hooks/useTranslations";

export const Profile = () => {
  const { data } = useQuery<GetUser>(FETCH_USER);
  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation();

  return (
    <Stack
      flexDirection="column"
      border="1px solid lightgray"
      borderRadius="0.5rem"
      marginY="1rem"
      padding="2rem 3rem"
    >
      <Avatar
        sx={{
          textTransform: "uppercase",
          width: "7rem",
          height: "7rem",
          fontSize: "3rem",
          margin: "0 auto",
        }}
      >
        {data?.getUser.firstName[0]}
        {data?.getUser.lastName[0]}
      </Avatar>

      {editMode ? (
        <FormUpdateUser
          setEditMode={setEditMode}
          defaultValues={{
            firstName: data?.getUser.firstName || "",
            lastName: data?.getUser.lastName || "",
            email: data?.getUser.email || "",
          }}
        />
      ) : (
        <>
          <Typography sx={{ fontSize: "2rem" }} align="center">
            {data?.getUser.firstName + " " + data?.getUser.lastName}
          </Typography>
          <Stack alignItems="flex-end">
            <Edit
              sx={{ cursor: "pointer" }}
              onClick={() => setEditMode(!editMode)}
            />
          </Stack>
          <Stack flexDirection="column" marginTop="1rem">
            <Typography sx={{ fontSize: "1.3rem" }}>
              {t("user.email")}: {data?.getUser.email}
            </Typography>
            <Typography sx={{ fontSize: "1.3rem" }}>
              {t("post.createdAt")}:&nbsp;
              {new Date(
                parseInt(data?.getUser.createdAt || "0")
              ).toLocaleDateString()}
            </Typography>
            <Typography sx={{ fontSize: "1.3rem" }}>
              {t("post.updatedAt")}:&nbsp;
              {new Date(
                parseInt(data?.getUser.updatedAt || "0")
              ).toLocaleDateString()}
            </Typography>
          </Stack>
        </>
      )}
    </Stack>
  );
};
