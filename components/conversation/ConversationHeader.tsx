"use client";

import useOtherUser from "@/hooks/useOtherUser";
import useActiveList from "@/stores/useActiveList";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import CustomAvatar from "../CustomAvatar";
import CustomAvatarGroup from "../CustomAvatarGroup";
import ProfileDrawer from "./ProfileDrawer";

type Props = {
  conversation: Conversation & { users: User[] };
};

const ConversationHeader = ({ conversation }: Props) => {
  const otherUser = useOtherUser(conversation);
  const { members } = useActiveList();
  const isOnline = members.includes(otherUser?.email || "");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    if (isOnline) {
      return "Online";
    }
    return "Offline";
  }, [conversation, isOnline]);

  return (
    <>
      <ProfileDrawer
        conversation={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <header className="bg-background w-full flex items-center justify-between border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition"
          >
            <HiChevronLeft />
          </Link>

          {conversation.isGroup ? (
            <CustomAvatarGroup users={conversation.users} />
          ) : (
            <CustomAvatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
          {/* <ModeToggle /> */}
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
        />
      </header>
    </>
  );
};

export default ConversationHeader;
