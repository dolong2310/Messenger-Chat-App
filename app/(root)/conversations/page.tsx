"use client";

import EmptyState from "@/components/EmptyState";
import useConversation from "@/hooks/useConversation";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {};

const ConversationsPage = (props: Props) => {
  const { isOpen } = useConversation();

  return (
    <div
      className={twMerge(
        "lg:pl-80 h-screen lg:block",
        isOpen ? "block" : "hidden"
      )}
    >
      <EmptyState />
    </div>
  );
};

export default ConversationsPage;
