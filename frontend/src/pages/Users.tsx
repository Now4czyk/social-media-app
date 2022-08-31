import { useQuery } from "@apollo/client";
import { FETCH_USERS, GetAllUsersQuery } from "../graphql";
import { CircularProgress } from "@mui/material";

export const Users = () => {
  const { loading, data } = useQuery<GetAllUsersQuery>(FETCH_USERS);

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
