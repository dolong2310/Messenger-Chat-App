import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import ConversationContent from "@/components/conversation/ConversationContent";
import ConversationForm from "@/components/conversation/ConversationForm";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import EmptyState from "@/components/EmptyState";

type Props = {
  params: Promise<{ conversationId: string }>;
};

const ConversationPage = async ({ params }: Props) => {
  const { conversationId } = await params;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-screen">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-screen">
      <div className="h-full flex flex-col">
        <ConversationHeader conversation={conversation} />
        <ConversationContent initialMessages={messages} />
        <ConversationForm />
      </div>
    </div>
  );
};

export default ConversationPage;
