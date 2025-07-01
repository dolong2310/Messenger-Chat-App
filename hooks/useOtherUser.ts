import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (
  conversation: FullConversationType | { users: User[] }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    // lấy user khác với user hiện tại
    const currentUserEmail = session.data?.user?.email;
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );
    return otherUser[0]; // trả về user khác đầu tiên (vì conversation chỉ có 2 user)
  }, [conversation.users, session.data?.user?.email]);

  return useMemo(() => otherUser, [otherUser]);
};

export default useOtherUser;
