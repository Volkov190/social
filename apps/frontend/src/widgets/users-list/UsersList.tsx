import { GET_ALL_USERS } from "@/entities/user/api";
import { useQuery } from "@apollo/client";
import { FC } from "react";

const UsersList: FC = () => {
  const { data } = useQuery(GET_ALL_USERS);

  return (
    <div className="flex flex-col gap-2">
      {data?.users.map((user) => (
        <div
          key={user.id}
          className="bg-secondary p-4 rounded-lg hover:bg-teal-300 hover:cursor-pointer text-sky-800 shadow-md hover:shadow-lg hover:transition-colors duration-700 flex gap-2"
        >
          {user.name}
          {user.birthdate}
          <span className="before:block before:absolute before:-inset-1 before:-skew-y-1 before:bg-accent relative inline-block text-background">
            <span className="relative">{user.email}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
