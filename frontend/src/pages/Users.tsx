import { useQuery } from "@apollo/client";
import { FETCH_USERS, UsersQuery } from "../graphql";
import { CircularProgress } from "@mui/material";

export const Users = () => {
  const { loading, data } = useQuery<UsersQuery>(FETCH_USERS);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        data?.getAllUsers.map((user) => (
          <>
            {user.email}
            <br />
          </>
        ))
      )}
    </div>
  );
};
