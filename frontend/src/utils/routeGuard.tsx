import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { auth } from "./auth";

interface RouteGuardProps {
  element: ReactNode;
}

export const RouteGuard = ({ element }: RouteGuardProps) => {
  try {
    jwtDecode<JwtPayload>(auth.getToken() || "");
    return element;
  } catch (err) {
    return <Navigate to="/unauthorized" />;
  }
};
