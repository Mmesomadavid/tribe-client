import { useMemo, useState } from "react";

import {
  Check,
  CheckCheck,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  Smile,
  Sparkles,
  Video,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import { Textarea } from "../../../components/ui/textarea";
import { ScrollArea } from "../../../components/ui/scroll-area";


// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type MessageStatus =
  | "sent"
  | "delivered"
  | "read";

type Message = {
  id: string;
  conversationId: string;
  sender: "me" | "them";
  content: string;
  createdAt: string;
  status?: MessageStatus;
};

type Conversation = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials: string;
  online: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
};


// ─────────────────────────────────────────────
// Mock conversations
// Replace with API data later
// ─────────────────────────────────────────────

const initialConversations: Conversation[] = [
  {
    id: "conversation-001",
    name: "Sarah Johnson",
    role: "Talent Acquisition · Nexa Systems",
    initials: "SJ",
    online: true,
    lastMessage:
      "I'd love to discuss the backend position with you.",
    lastMessageTime: "2m",
    unread: 2,

    messages: [
      {
        id: "message-001",
        conversationId: "conversation-001",
        sender: "them",
        content:
          "Hi! I came across your profile on WorkTribe and was really impressed by your backend engineering experience.",
        createdAt: "10:32 AM",
        status: "read",
      },
      {
        id: "message-002",
        conversationId: "conversation-001",
        sender: "me",
        content:
          "Thanks, Sarah. I appreciate that. I'd definitely be interested in learning more about the opportunity.",
        createdAt: "10:35 AM",
        status: "read",
      },
      {
        id: "message-003",
        conversationId: "conversation-001",
        sender: "them",
        content:
          "Great. We're currently hiring a Senior Backend Engineer to work on our distributed systems platform.",
        createdAt: "10:37 AM",
        status: "read",
      },
      {
        id: "message-004",
        conversationId: "conversation-001",
        sender: "them",
        content:
          "I'd love to discuss the backend position with you.",
        createdAt: "10:38 AM",
        status: "read",
      },
    ],
  },

  {
    id: "conversation-002",
    name: "Michael Chen",
    role: "Engineering Manager · CloudForge",
    initials: "MC",
    online: true,
    lastMessage:
      "Are you available for a quick call tomorrow?",
    lastMessageTime: "1h",
    unread: 1,

    messages: [
      {
        id: "message-005",
        conversationId: "conversation-002",
        sender: "them",
        content:
          "Hello! I saw your application for our Backend Engineer position.",
        createdAt: "9:12 AM",
        status: "read",
      },
      {
        id: "message-006",
        conversationId: "conversation-002",
        sender: "me",
        content:
          "Hi Michael, yes. I'm very interested in the position.",
        createdAt: "9:18 AM",
        status: "read",
      },
      {
        id: "message-007",
        conversationId: "conversation-002",
        sender: "them",
        content:
          "Are you available for a quick call tomorrow?",
        createdAt: "9:22 AM",
        status: "delivered",
      },
    ],
  },

  {
    id: "conversation-003",
    name: "Acme Hiring Team",
    role: "Acme Inc.",
    initials: "AH",
    online: false,
    lastMessage:
      "Your application has moved to the next stage.",
    lastMessageTime: "Yesterday",
    unread: 0,

    messages: [
      {
        id: "message-008",
        conversationId: "conversation-003",
        sender: "them",
        content:
          "Thank you for applying to Acme Inc.",
        createdAt: "Yesterday",
        status: "read",
      },
      {
        id: "message-009",
        conversationId: "conversation-003",
        sender: "them",
        content:
          "Your application has moved to the next stage.",
        createdAt: "Yesterday",
        status: "read",
      },
    ],
  },

  {
    id: "conversation-004",
    name: "David Williams",
    role: "Founder · Vertex Labs",
    initials: "DW",
    online: false,
    lastMessage:
      "Let's keep in touch about future opportunities.",
    lastMessageTime: "Mon",
    unread: 0,

    messages: [
      {
        id: "message-010",
        conversationId: "conversation-004",
        sender: "them",
        content:
          "Your platform engineering background looks very interesting.",
        createdAt: "Mon",
        status: "read",
      },
      {
        id: "message-011",
        conversationId: "conversation-004",
        sender: "me",
        content:
          "Thank you. I'd be happy to stay connected.",
        createdAt: "Mon",
        status: "read",
      },
      {
        id: "message-012",
        conversationId: "conversation-004",
        sender: "them",
        content:
          "Let's keep in touch about future opportunities.",
        createdAt: "Mon",
        status: "read",
      },
    ],
  },
];


// ─────────────────────────────────────────────
// Messages Page
// ─────────────────────────────────────────────

export default function Messages() {
  const [conversations, setConversations] = useState(
    initialConversations
  );

  const [selectedId, setSelectedId] = useState(
    initialConversations[0]?.id ?? ""
  );

  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");


  // ─────────────────────────────────────────────
  // Selected conversation
  // ─────────────────────────────────────────────

  const selectedConversation = conversations.find(
    (conversation) =>
      conversation.id === selectedId
  );


  // ─────────────────────────────────────────────
  // Search conversations
  // ─────────────────────────────────────────────

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return conversations;
    }

    return conversations.filter(
      (conversation) =>
        conversation.name
          .toLowerCase()
          .includes(query) ||
        conversation.role
          .toLowerCase()
          .includes(query) ||
        conversation.lastMessage
          .toLowerCase()
          .includes(query)
    );
  }, [conversations, search]);


  // ─────────────────────────────────────────────
  // Select conversation
  // ─────────────────────────────────────────────

  const handleSelectConversation = (
    conversation: Conversation
  ) => {
    setSelectedId(conversation.id);

    setConversations((current) =>
      current.map((item) =>
        item.id === conversation.id
          ? {
              ...item,
              unread: 0,
            }
          : item
      )
    );
  };


  // ─────────────────────────────────────────────
  // Send message
  // ─────────────────────────────────────────────

  const handleSendMessage = () => {
    const content = message.trim();

    if (!content || !selectedConversation) {
      return;
    }

    const newMessage: Message = {
      id: `message-${Date.now()}`,
      conversationId:
        selectedConversation.id,
      sender: "me",
      content,
      createdAt: "Now",
      status: "sent",
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,

              lastMessage: content,

              lastMessageTime: "Now",

              messages: [
                ...conversation.messages,
                newMessage,
              ],
            }
          : conversation
      )
    );

    setMessage("");
  };


  // ─────────────────────────────────────────────
  // Enter to send
  // ─────────────────────────────────────────────

  const handleMessageKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSendMessage();
    }
  };


  return (
    <div className="flex h-[calc(100vh-0px)] min-h-[650px] w-full overflow-hidden bg-white">

      {/* ═══════════════════════════════════════════
          CONTACT / CONVERSATION SIDEBAR
      ═══════════════════════════════════════════ */}

      <aside className="flex w-[340px] shrink-0 flex-col border-r border-gray-200 bg-white">

        {/* Header */}

        <div className="px-5 pb-4 pt-6">

          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-950">
                Messages
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                Conversations with your network
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
            >
              <MoreHorizontal className="size-5" />
            </Button>

          </div>


          {/* Search */}

          <div className="relative mt-5">

            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

            <Input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search messages"
              className="h-10 rounded-lg border-gray-200 bg-gray-50 pl-9 text-sm shadow-none focus-visible:ring-1"
            />

          </div>

        </div>


        <Separator />


        {/* Contacts */}

        <ScrollArea className="flex-1">

          <div className="p-2">

            {filteredConversations.length === 0 ? (

              <div className="px-4 py-12 text-center">

                <p className="text-sm font-medium text-gray-900">
                  No conversations found
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Try searching for another person.
                </p>

              </div>

            ) : (

              filteredConversations.map(
                (conversation) => {

                  const active =
                    conversation.id ===
                    selectedId;

                  return (
                    <button
                      key={conversation.id}
                      type="button"
                      onClick={() =>
                        handleSelectConversation(
                          conversation
                        )
                      }
                      className={`flex w-full gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                        active
                          ? "bg-gray-100"
                          : "hover:bg-gray-50"
                      }`}
                    >

                      {/* Avatar */}

                      <div className="relative shrink-0">

                        <Avatar className="size-11">

                          <AvatarImage
                            src={
                              conversation.avatar
                            }
                            alt={
                              conversation.name
                            }
                          />

                          <AvatarFallback className="bg-gray-900 text-xs font-medium text-white">
                            {
                              conversation.initials
                            }
                          </AvatarFallback>

                        </Avatar>


                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-emerald-500" />
                        )}

                      </div>


                      {/* Conversation info */}

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center justify-between gap-2">

                          <p
                            className={`truncate text-sm ${
                              conversation.unread > 0
                                ? "font-semibold text-gray-950"
                                : "font-medium text-gray-900"
                            }`}
                          >
                            {conversation.name}
                          </p>

                          <span className="shrink-0 text-[10px] text-gray-400">
                            {
                              conversation.lastMessageTime
                            }
                          </span>

                        </div>


                        <p className="mt-0.5 truncate text-xs text-gray-500">
                          {conversation.role}
                        </p>


                        <div className="mt-1 flex items-center gap-2">

                          <p
                            className={`truncate text-xs ${
                              conversation.unread > 0
                                ? "font-medium text-gray-700"
                                : "text-gray-400"
                            }`}
                          >
                            {
                              conversation.lastMessage
                            }
                          </p>


                          {conversation.unread >
                            0 && (
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[10px] font-semibold text-white">
                              {
                                conversation.unread
                              }
                            </span>
                          )}

                        </div>

                      </div>

                    </button>
                  );
                }
              )

            )}

          </div>

        </ScrollArea>

      </aside>


      {/* ═══════════════════════════════════════════
          MESSAGE PANEL
      ═══════════════════════════════════════════ */}

      <section className="flex min-w-0 flex-1 flex-col bg-white">

        {!selectedConversation ? (

          <EmptyConversation />

        ) : (

          <>

            {/* Conversation header */}

            <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-gray-200 px-6">

              <div className="flex items-center gap-3">

                <div className="relative">

                  <Avatar className="size-10">

                    <AvatarImage
                      src={
                        selectedConversation.avatar
                      }
                      alt={
                        selectedConversation.name
                      }
                    />

                    <AvatarFallback className="bg-gray-900 text-xs font-medium text-white">
                      {
                        selectedConversation.initials
                      }
                    </AvatarFallback>

                  </Avatar>

                  {selectedConversation.online && (
                    <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-white bg-emerald-500" />
                  )}

                </div>


                <div>

                  <h2 className="text-sm font-semibold text-gray-950">
                    {
                      selectedConversation.name
                    }
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-500">
                    {
                      selectedConversation.online
                        ? "Active now"
                        : selectedConversation.role
                    }
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-1">

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  title="Start video call"
                >
                  <Video className="size-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                >
                  <MoreHorizontal className="size-4" />
                </Button>

              </div>

            </header>


            {/* Messages */}

            <ScrollArea className="flex-1">

              <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 px-6 py-8">

                {/* Conversation intro */}

                <div className="mx-auto mb-4 text-center">

                  <Avatar className="mx-auto size-12">

                    <AvatarImage
                      src={
                        selectedConversation.avatar
                      }
                      alt={
                        selectedConversation.name
                      }
                    />

                    <AvatarFallback className="bg-gray-900 text-sm font-medium text-white">
                      {
                        selectedConversation.initials
                      }
                    </AvatarFallback>

                  </Avatar>

                  <h3 className="mt-3 text-sm font-semibold text-gray-950">
                    {
                      selectedConversation.name
                    }
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {
                      selectedConversation.role
                    }
                  </p>

                  <p className="mt-2 text-[11px] text-gray-400">
                    This is the beginning of your
                    conversation.
                  </p>

                </div>


                {selectedConversation.messages.map(
                  (item) => {

                    const mine =
                      item.sender === "me";

                    return (
                      <div
                        key={item.id}
                        className={`flex ${
                          mine
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        <div
                          className={`max-w-[70%] ${
                            mine
                              ? "items-end"
                              : "items-start"
                          } flex flex-col`}
                        >

                          <div
                            className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                              mine
                                ? "rounded-br-md bg-gray-900 text-white"
                                : "rounded-bl-md bg-gray-100 text-gray-900"
                            }`}
                          >
                            {item.content}
                          </div>


                          <div
                            className={`mt-1.5 flex items-center gap-1.5 px-1 ${
                              mine
                                ? "flex-row-reverse"
                                : ""
                            }`}
                          >

                            <span className="text-[10px] text-gray-400">
                              {item.createdAt}
                            </span>

                            {mine && (
                              <MessageStatus
                                status={
                                  item.status
                                }
                              />
                            )}

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </ScrollArea>


            {/* Composer */}

            <div className="border-t border-gray-200 bg-white px-6 py-4">

              <div className="mx-auto max-w-4xl">

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-2">

                  <Textarea
                    value={message}
                    onChange={(event) =>
                      setMessage(
                        event.target.value
                      )
                    }
                    onKeyDown={
                      handleMessageKeyDown
                    }
                    placeholder={`Message ${selectedConversation.name}...`}
                    className="min-h-[70px] resize-none border-0 bg-transparent px-2 py-1.5 text-sm shadow-none focus-visible:ring-0"
                  />


                  <div className="flex items-center justify-between px-1 pt-2">

                    <div className="flex items-center gap-1">

                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg text-gray-500"
                      >
                        <Paperclip className="size-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg text-gray-500"
                      >
                        <Smile className="size-4" />
                      </Button>

                    </div>


                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="rounded-lg"
                    >
                      Send
                      <Send className="ml-1.5 size-3.5" />
                    </Button>

                  </div>

                </div>


                <p className="mt-2 text-center text-[10px] text-gray-400">
                  Press Enter to send · Shift + Enter
                  for a new line
                </p>

              </div>

            </div>

          </>

        )}

      </section>

    </div>
  );
}


// ─────────────────────────────────────────────
// Message status
// ─────────────────────────────────────────────

function MessageStatus({
  status,
}: {
  status?: MessageStatus;
}) {
  if (status === "read") {
    return (
      <CheckCheck className="size-3 text-blue-500" />
    );
  }

  if (status === "delivered") {
    return (
      <CheckCheck className="size-3 text-gray-400" />
    );
  }

  return (
    <Check className="size-3 text-gray-400" />
  );
}


// ─────────────────────────────────────────────
// Empty conversation
// ─────────────────────────────────────────────

function EmptyConversation() {
  return (
    <div className="flex flex-1 items-center justify-center">

      <div className="max-w-sm px-6 text-center">

        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gray-100">
          <Sparkles className="size-6 text-gray-500" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-950">
          Your messages
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Select a conversation from the left to
          view your messages and continue the
          conversation.
        </p>

      </div>

    </div>
  );
}