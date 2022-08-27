import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { AppBar, Box, Container, Tab, Tabs } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { AuthorizationQuery, VERIFY } from "../../graphql";
import { UserPopover } from "./Navigation/UserPopover";

interface LayoutProps {
  children?: ReactNode;
}

type Sites = "/posts" | "/users" | "/form" | "/profile";

const sites = ["/posts", "/users", "/form", "/profile"];

export const Layout = ({ children }: LayoutProps) => {
  const { data } = useQuery<AuthorizationQuery>(VERIFY);
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState<Sites>(location.pathname as Sites);

  useEffect(() => {
    setValue(location.pathname as Sites);
  }, [location.pathname]);

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
          {data?.verify.isAuthorized && (
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Posts" style={{ color: "white" }} value="/posts" />
              <Tab
                label="Profile"
                style={{ color: "white" }}
                value="/profile"
              />
              <Tab label="Users" style={{ color: "white" }} value="/users" />
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
