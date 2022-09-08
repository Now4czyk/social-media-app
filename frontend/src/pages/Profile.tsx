import { Avatar, Box, Typography } from "@mui/material";
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
    <Box>
      <Typography>{t("tabs.profile")}</Typography>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Avatar
          sx={{
            textTransform: "uppercase",
            width: "10rem",
            height: "10rem",
            fontSize: "4rem",
          }}
        >
          {data?.getUser.firstName[0]}
          {data?.getUser.lastName[0]}
        </Avatar>
        <Edit
          sx={{ cursor: "pointer" }}
          onClick={() => setEditMode(!editMode)}
        />
      </Box>
      <Typography>Language: Polish/English</Typography>
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
          <Typography>
            {t("user.firstName")}: {data?.getUser.firstName}
          </Typography>
          <Typography>
            {t("user.lastName")}: {data?.getUser.lastName}
          </Typography>
          <Typography>
            {t("user.email")}: {data?.getUser.email}
          </Typography>
          <Typography>
            {t("post.createdAt")}:
            {" " + new Date(parseInt(data?.getUser.createdAt || "")).toString()}
          </Typography>
          <Typography>
            {t("post.updatedAt")}:
            {" " + new Date(parseInt(data?.getUser.updatedAt || "")).toString()}
          </Typography>
        </>
      )}
    </Box>
  );
};
