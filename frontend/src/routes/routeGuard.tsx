import { ReactNode } from "react";
import { auth } from "utils";
import { Navigate } from "react-router-dom";

interface RouteGuardProps {
  element: ReactNode;
}

export const RouteGuard = ({ element }: RouteGuardProps) =>
  auth.getToken() ? element : <Navigate to="/unauthorized" />;
