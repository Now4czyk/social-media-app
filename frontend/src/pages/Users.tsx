// @ts-nocheck
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "../graphql/Queries";
import { useEffect, useState } from "react";

export const Users = () => {
  const { error, loading, data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data?.getAllUsers);
      console.log(data?.getAllUsers);
    }
  }, [data]);

  return (
    <div>
      {loading
        ? "LOADING"
        : users.map((user) => (
            <>
              {user.email}
              <br />
            </>
          ))}
    </div>
  );
};
