import { useQuery } from "@apollo/client";
import { LOAD_USERS, UserType } from "../graphql";
import { useEffect, useState } from "react";

export const Users = () => {
  const { error, loading, data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  console.log(users);

  return (
    <div>
      {loading
        ? "LOADING"
        : users
        ? users.map((user: UserType) => (
            <>
              {user.email}
              <br />
            </>
          ))
        : ""}
    </div>
  );
};
