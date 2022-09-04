import { useQuery } from "@apollo/client";
import { FETCH_USERS, GetAllUsers } from "graphql/User";
import { CircularProgress } from "@mui/material";

export const Users = () => {
  const { loading, data } = useQuery<GetAllUsers>(FETCH_USERS);

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
