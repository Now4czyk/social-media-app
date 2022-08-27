import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { AuthorizationQuery, VERIFY } from "../graphql";

interface RouteGuardProps {
  element: ReactNode;
}

export const RouteGuard = ({ element }: RouteGuardProps) => {
  const { data } = useQuery<AuthorizationQuery>(VERIFY);

  return data?.verify.isAuthorized ? element : <Navigate to="/unauthorized" />;
};
