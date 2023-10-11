import { UsersList } from "@/widgets/users-list";

const UsersPage = () => {
  return (
    <>
      <h1 className="mb-2 text-xl">Пользователи</h1>
      <div className="bg-teal-100 p-8 rounded-lg shadow-md">
        <UsersList />
      </div>
    </>
  );
};

export default UsersPage;
