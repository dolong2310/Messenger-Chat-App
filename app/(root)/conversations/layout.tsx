import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";
import ConversationList from "@/components/ConversationList";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ConversationsLayout = async ({ children }: Props) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
