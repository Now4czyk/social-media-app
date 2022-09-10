import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Tab,
  Container,
  Tabs,
  useMediaQuery,
  Drawer,
  Typography,
  BottomNavigation,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { UserPopover } from "./UserPopover";
import { auth, MD } from "utils";
import useTranslation from "translations/hooks/useTranslations";
import { LanguageSwitcher } from "../../translations/components";
import { DrawerList } from "./DrawerList";
import { Footer } from "../Footer";

interface LayoutProps {
  children?: ReactNode;
}

type Sites = "/posts" | "/users" | "/profile" | "/forum";

const sites = ["/posts", "/users", "/profile", "/forum"];

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const matches = useMediaQuery(MD);
  const [state, setState] = useState(false);

  const site = sites.find((site) => location.pathname.includes(site));
  const [value, setValue] = useState<Sites>(site as Sites);

  useEffect(() => {
    setValue(site as Sites);
  }, [location.pathname, site]);

  const handleChange = (event: ChangeEvent<{}>, value: string) => {
    setValue(value as Sites);
    navigate(`${value}`);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "#1D2A44",
          display: "flex",
          padding: "0 3rem",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              lineHeight: "3rem",
              fontSize: "1.5rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={() => navigate("/posts")}
          >
            Boring App
          </Box>
          {auth.getToken() && matches && (
            <Tabs value={value} onChange={handleChange}>
              <Tab
                label={t("tabs.posts")}
                sx={{ color: "white" }}
                value="/posts"
              />
              <Tab
                label={t("tabs.profile")}
                sx={{ color: "white" }}
                value="/profile"
              />
              {/*Section that shows registered users*/}
              {/*<Tab*/}
              {/*  label={t("tabs.users")}*/}
              {/*  style={{ color: "white" }}*/}
              {/*  value="/users"*/}
              {/*/>*/}
              <Tab
                label={t("tabs.forum")}
                sx={{ color: "white" }}
                value="/forum"
              />
            </Tabs>
          )}
        </Box>
        <Box sx={{ display: "flex", columnGap: "2rem" }}>
          <LanguageSwitcher />
          {matches ? (
            <UserPopover />
          ) : (
            <>
              <Menu
                sx={{ marginY: "auto" }}
                fontSize="large"
                onClick={toggleDrawer(true)}
              />
              <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
                <DrawerList />
              </Drawer>
            </>
          )}
        </Box>
      </AppBar>
      <Container fixed>{children}</Container>
      <Footer />
      <BottomNavigation
        sx={{
          display: "flex",
          textAlign: "center",
          background: "#1D2A44",
          width: "100%",
          height: "2rem",
        }}
      >
        <Typography
          sx={{ lineHeight: "2rem", fontSize: "0.9rem", color: "white" }}
        >
          &copy;2022 Kacper Nowaczyk
        </Typography>
      </BottomNavigation>
    </>
  );
};
