"use client";

import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";

type Props = {
  initialItems: FullConversationType[];
  users: User[];
};

const ConversationList = ({ initialItems, users }: Props) => {
  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const [items, setItems] = useState<FullConversationType[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pusherKey = useMemo(() => {
    return session.data?.user?.email || "";
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (pusherKey) {
      const channel = pusherClient.subscribe(pusherKey);

      const newMessageHandler = (newConversation: FullConversationType) => {
        setItems((current) => {
          if (current.find((item) => item.id === newConversation.id)) {
            return current;
          }
          return [newConversation, ...current];
        });
      };

      const updateMessageHandler = (
        updatedConversation: FullConversationType
      ) => {
        setItems((current) =>
          current.map((currentConversation) => {
            if (currentConversation.id === updatedConversation.id) {
              return {
                ...currentConversation,
                messages: updatedConversation.messages,
              };
            }
            return currentConversation;
          })
        );
      };

      const deleteMessageHandler = (
        deletedConversation: FullConversationType
      ) => {
        setItems((current) =>
          current.filter((item) => item.id !== deletedConversation.id)
        );

        if (deletedConversation.id === conversationId) {
          router.push("/conversations");
        }
      };

      channel.bind("conversation:new", newMessageHandler);
      channel.bind("conversation:update", updateMessageHandler);
      channel.bind("conversation:delete", deleteMessageHandler);

      return () => {
        pusherClient.unsubscribe(pusherKey);
        channel.unbind("conversation:new", newMessageHandler);
        channel.unbind("conversation:update", updateMessageHandler);
        channel.unbind("conversation:delete", deleteMessageHandler);
      };
    }
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <aside
        className={twMerge(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto bg-back border-r",
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-foreground">Messages</div>
            <div
              className="rounded-full p-2 bg-primary-foreground text-foreground cursor-pointer hover:opacity-75 transition"
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>

          {items.map((item) => (
            <ConversationBox
              key={item.id}
              conversation={item}
              selected={item.id === conversationId}
            />
          ))}
        </div>
      </aside>
      <GroupChatModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        users={users}
      />
    </>
  );
};

export default ConversationList;
