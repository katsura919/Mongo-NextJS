"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, Send, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { fetchConversations, createConversation, fetchMessages, sendMessage } from "@/lib/api";
import io from "socket.io-client";

const socket = io(`https://mongo-backend-4prm.onrender.com`);

interface Conversation {
  _id: string;
  participants: { _id: string; email: string }[];
}

interface Message {
  _id: string;
  sender: string;
  content: string;
  timestamp: string;
  conversationId: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const loadConversations = useCallback(async () => {
    if (!user?._id) return;
    try {
      const response = await fetchConversations(user._id);
      setConversations(response.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  }, [user]); // Depend on 'user'

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      loadConversations();
    }
  }, [user, router, loadConversations]); // Now 'loadConversations' is included

  // Fetch messages for selected conversation
  const loadMessages = async (conversation: Conversation) => {
    if (!user) return;

    const receiver = conversation.participants.find((p) => p._id !== user._id);
    if (!receiver) return;

    try {
      const response = await fetchMessages(user._id, receiver._id); // Pass both user IDs
      setMessages(response.data);
      socket.emit("joinRoom", conversation._id);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handle selecting a conversation
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    loadMessages(conversation);
  };

  // WebSocket listener for new messages
  useEffect(() => {
    socket.on("receiveMessage", (message: Message) => {
      // Ensure the message has the correct structure
      const formattedMessage: Message = {
        _id: message._id,
        sender: message.sender,
        content: message.content || message.content, // Ensure content exists
        timestamp: message.timestamp,
        conversationId: message.conversationId,
      };

      setMessages((prevMessages) => {
        // Prevent duplicate messages
        if (prevMessages.some((msg) => msg._id === formattedMessage._id)) {
          return prevMessages;
        }
        return [...prevMessages, formattedMessage];
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Send a message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user?.email) return;

    const receiverEmail = selectedConversation.participants.find(
      (p) => p.email !== user.email
    )?.email;

    if (!receiverEmail) {
      console.error("Receiver email is undefined.");
      return;
    }

    // Temporary message structure for optimistic UI update
    const tempMessage: Message = {
      _id: new Date().getTime().toString(), // Temporary ID
      sender: user.email,
      content: newMessage, // Ensure the field is 'content', not 'text'
      timestamp: new Date().toISOString(),
      conversationId: selectedConversation._id,
    };

    // Optimistically update UI
    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    try {
      // Send message to backend
      await sendMessage(user.email, receiverEmail, newMessage);
      loadMessages(selectedConversation);
      // Emit the message through WebSocket
      socket.emit("sendMessage", tempMessage);

      // Clear input field
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Create a new conversation
  const handleNewConversation = async () => {
    if (!user?.username) {
      console.error("User username is undefined");
      return;
    }

    const recipientUsername = prompt("Enter the username of the user you want to chat with:");
    if (!recipientUsername) return;

    try {
      await createConversation(user.username, recipientUsername);
      await loadConversations();
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
        <p className="ml-2 text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Conversations List */}
      <div className="w-1/4 bg-white border-r p-4">
        <div className="flex items-center gap-2 mb-4">
          <Input placeholder="Search conversations..." className="w-full" />
          <Search className="w-5 h-5 text-gray-500" />
        </div>
        <Button className="mb-4 w-full" onClick={handleNewConversation}>
          <Plus className="w-5 h-5 mr-2" />
          New Conversation
        </Button>
        <div className="overflow-auto h-[70vh]">
          {conversations.map((conversation) => (
            <Card
              key={conversation._id}
              onClick={() => handleSelectConversation(conversation)}
              className={`p-4 cursor-pointer hover:bg-gray-200 rounded-md ${
                selectedConversation?._id === conversation._id ? "bg-gray-300" : ""
              }`}
            >
              {conversation.participants
                .filter((p) => p._id !== user?._id)
                .map((p) => p.email)}
            </Card>
          ))}
        </div>
        <Button variant="destructive" className="mt-4 w-full" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Chat Panel */}
      <div className="w-3/4 flex flex-col h-full">
        {selectedConversation ? (
          <>
            <div className="bg-white p-4 border-b font-semibold text-lg">
              {selectedConversation.participants
                .filter((p) => p._id !== user?._id)
                .map((p) => p.email)}
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-3 rounded-lg w-fit ${
                    msg.sender === user?._id ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            <div className="bg-white p-4 flex items-center gap-2 border-t">
              <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
              <Button onClick={handleSendMessage}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
