import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CardHeader,
  Container,
  Tab,
  Tabs,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Authorization, VERIFY } from "../../graphql";

interface LayoutProps {
  children?: ReactNode;
}

type Sites = "/home" | "/users" | "/form";

const sites = ["/home", "/users", "/form"];

export const Layout = ({ children }: LayoutProps) => {
  const { data, error } = useQuery<Authorization>(VERIFY);
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
            onClick={() => navigate("/home")}
          >
            Boring App
          </Box>
          {data?.verify.isAuthorized && (
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Home" style={{ color: "white" }} value="/home" />
              <Tab label="Users" style={{ color: "white" }} value="/users" />
              <Tab label="Form" style={{ color: "white" }} value="/form" />
            </Tabs>
          )}
        </Box>
        <Avatar sx={{ marginY: "auto", cursor: "pointer" }} />
      </AppBar>
      <Container sx={{ backgroundColor: "lightgray" }} fixed>
        {children}
      </Container>
    </>
  );
};
