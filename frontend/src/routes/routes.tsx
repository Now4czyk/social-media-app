import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "../pages/Authentication";
import { RouteGuard } from "./routeGuard";
import { Users, Logout, NotFound, Unauthorized, Posts } from "../pages";
import React from "react";
import { Profile } from "../pages/Profile";

export const MainRoutes = () => (
  <Routes>
    <Route path="/signin" element={<Authentication />} />
    <Route path="/signup" element={<Authentication />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/posts" element={RouteGuard({ element: <Posts /> })} />
    <Route path="/profile" element={RouteGuard({ element: <Profile /> })} />
    <Route path="/users" element={RouteGuard({ element: <Users /> })} />
    <Route path="/*" element={<Navigate to="not-found" />} />
  </Routes>
);
