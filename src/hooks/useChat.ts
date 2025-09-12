import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import io from "socket.io-client";

const WS = import.meta.env.VITE_APP_NAMES_WS;

export const useChat = (supportRequest: string) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(WS);
    setSocket(newSocket);

    newSocket.emit("subscribeToChat", supportRequest);

    newSocket.on("receiveMessage", (newChat) => {
      setMessages(newChat.messages);
    });

    return () => {
      newSocket.close();
    };
  }, [supportRequest]);

  const sendMessage = (author: string, text: string) => {
    if (socket) socket.emit("sendMessage", { author, supportRequest, text });
    setMessage("");
  };

  return {
    messages,
    message,
    setMessage,
    sendMessage,
  };
};
