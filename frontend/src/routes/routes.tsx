import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "../pages/Authentication";
import { Unauthorized } from "../pages/Unauthorized";
import { NotFound } from "../pages/NotFound";
import { Logout } from "../pages/Logout";
import { RouteGuard } from "./routeGuard";
import { Form, Home, Users } from "../pages";
import React from "react";

export const MainRoutes = () => (
  <Routes>
    <Route path="/signin" element={<Authentication />} />
    <Route path="/signup" element={<Authentication />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/home" element={RouteGuard({ element: <Home /> })} />
    <Route path="/form" element={RouteGuard({ element: <Form /> })} />
    <Route path="/users" element={RouteGuard({ element: <Users /> })} />
    <Route path="/*" element={<Navigate to="not-found" />} />
  </Routes>
);
