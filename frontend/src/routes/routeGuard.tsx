import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Authorization, VERIFY } from "../graphql";

interface RouteGuardProps {
  element: ReactNode;
}

export const RouteGuard = ({ element }: RouteGuardProps) => {
  const { data } = useQuery<Authorization>(VERIFY);

  return data?.verify.isAuthorized ? element : <Navigate to="/unauthorized" />;
};
