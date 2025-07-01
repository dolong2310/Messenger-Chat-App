import getUsers from "@/app/actions/getUsers";
import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "@/components/UserList";
import React from "react";

type Props = { children: React.ReactNode };

const UsersLayout = async ({ children }: Props) => {
  const users = await getUsers();

  return (
    <Sidebar>
      <UserList users={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default UsersLayout;
