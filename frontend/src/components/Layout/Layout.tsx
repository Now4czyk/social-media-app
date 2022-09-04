import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { AppBar, Box, Container, Tab, Tabs } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { UserPopover } from "./Navigation/UserPopover";
import { auth } from "../../utils";

interface LayoutProps {
  children?: ReactNode;
}

type Sites = "/posts" | "/users" | "/profile" | "/forum";

const sites = ["/posts", "/users", "/profile", "/forum"];

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const site = sites.find((site) => location.pathname.includes(site));

  const [value, setValue] = useState<Sites>(site as Sites);

  useEffect(() => {
    setValue(site as Sites);
  }, [location.pathname, site]);

  const handleChange = (event: ChangeEvent<{}>, value: string) => {
    setValue(value as Sites);
    navigate(`${value}`);
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
          {auth.getToken() && (
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Posts" style={{ color: "white" }} value="/posts" />
              <Tab
                label="Profile"
                style={{ color: "white" }}
                value="/profile"
              />
              <Tab label="Users" style={{ color: "white" }} value="/users" />
              <Tab label="Forum" style={{ color: "white" }} value="/forum" />
            </Tabs>
          )}
        </Box>
        <UserPopover />
      </AppBar>
      <Container sx={{ backgroundColor: "lightgray" }} fixed>
        {children}
      </Container>
    </>
  );
};
