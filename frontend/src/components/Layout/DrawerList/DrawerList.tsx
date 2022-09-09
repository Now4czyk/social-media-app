import { Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { Chat, GridView, Login, Logout, Person } from "@mui/icons-material";
import { auth } from "../../../utils";
import { useQuery } from "@apollo/client";
import { Verification, VERIFY } from "../../../graphql/Authorization";
import { useNavigate } from "react-router-dom";
import useTranslation from "../../../translations/hooks/useTranslations";

export const DrawerList = () => {
  const { data } = useQuery<Verification>(VERIFY);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <List sx={{ minWidth: "15rem", height: "100vh" }} component="nav">
      {data?.verify.isAuthorized && (
        <>
          <ListItemButton>
            <Person sx={{ marginRight: "1rem" }} />
            <ListItemText
              primary={t("tabs.profile")}
              onClick={() => navigate("profile")}
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <GridView sx={{ marginRight: "1rem" }} />
            <ListItemText
              primary={t("tabs.posts")}
              onClick={() => navigate("posts")}
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <Chat sx={{ marginRight: "1rem" }} />
            <ListItemText
              primary={t("tabs.forum")}
              onClick={() => navigate("forum")}
            />
          </ListItemButton>
          <Divider />
        </>
      )}
      <ListItemButton sx={{ height: "3rem" }}>
        {data?.verify.isAuthorized ? (
          <>
            <Login sx={{ marginRight: "1rem" }} />
            <ListItemText
              primary={t("actions.logout")}
              onClick={() => {
                auth.logout();
                navigate("logout");
                navigate(0);
              }}
            />
          </>
        ) : (
          <>
            <Logout sx={{ marginRight: "1rem" }} />
            <ListItemText
              primary={t("actions.signin")}
              onClick={() => navigate("signin")}
            />
          </>
        )}
      </ListItemButton>
    </List>
  );
};
