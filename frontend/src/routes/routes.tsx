import { Navigate, Route, Routes } from "react-router-dom";
import { Authentication } from "pages";
import { RouteGuard } from "./routeGuard";
import {
  Users,
  Logout,
  NotFound,
  Unauthorized,
  Posts,
  Profile,
  PostDetails,
  UserDetails,
  Forum,
} from "pages";

export const AppRoutes = () => (
  <Routes>
    <Route path="/signin" element={<Authentication />} />
    <Route path="/signup" element={<Authentication />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="/logout" element={<Logout />} />
    <Route
      path="/posts/:postId"
      element={RouteGuard({ element: <PostDetails /> })}
    />
    <Route
      path={"/"}
      element={RouteGuard({ element: <Navigate to={"/posts"} /> })}
    />
    <Route path={"/posts"} element={RouteGuard({ element: <Posts /> })} />
    <Route path="/profile" element={RouteGuard({ element: <Profile /> })} />
    <Route path="/forum" element={RouteGuard({ element: <Forum /> })} />
    <Route
      path="/users/:userId"
      element={RouteGuard({ element: <UserDetails /> })}
    />
    <Route path="/users" element={RouteGuard({ element: <Users /> })} />
    <Route path="/*" element={<Navigate to="not-found" />} />
  </Routes>
);
