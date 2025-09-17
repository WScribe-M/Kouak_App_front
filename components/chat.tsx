"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface ChatProps {
  token: string; // ton token JWT
}

// typage d'un message
interface Message {
  user: string;
  text: string;
}

const socket = io("http://localhost:4000"); // serveur Socket.IO

const Chat: React.FC<ChatProps> = ({ token }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>("");

  // décoder le token JWT pour récupérer l'utilisateur
  useEffect(() => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.username || payload.email || "Moi");
    } catch {
      setUsername("Moi");
    }
  }, [token]);

  useEffect(() => {
    socket.on("receiveMessage", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage: Message = { user: username, text: message };
      socket.emit("sendMessage", newMessage); // envoie { user, text } au serveur
      setMessage("");
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "24px",
      borderRadius: "16px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
      background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "bold" as const,
      color: "#222",
      marginBottom: "12px",
      textAlign: "center" as const,
    },
    messagesContainer: {
      minHeight: "300px",
      maxHeight: "400px",
      overflowY: "auto" as const,
      display: "flex",
      flexDirection: "column" as const,
      gap: "8px",
      padding: "8px",
      border: "1px solid #bfc9d9",
      borderRadius: "8px",
      background: "#fff",
    },
    messageRow: (isOwn: boolean) => ({
      display: "flex",
      justifyContent: isOwn ? "flex-end" : "flex-start",
    }),
    messageBubble: (isOwn: boolean) => ({
      padding: "10px 16px",
      borderRadius: "16px",
      background: isOwn ? "#0070f3" : "#e5e7eb",
      color: isOwn ? "#fff" : "#000",
      maxWidth: "70%",
      wordBreak: "break-word" as const,
    }),
    username: {
      fontSize: "0.8rem",
      marginBottom: "4px",
      fontWeight: "bold" as const,
    },
    inputContainer: {
      display: "flex",
      gap: "8px",
    },
    input: {
      flex: 1,
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #bfc9d9",
      outline: "none",
      fontSize: "16px",
    },
    button: {
      padding: "12px 24px",
      background: "linear-gradient(90deg, #0070f3 0%, #0051a8 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold" as const,
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Chat en temps réel</div>
      <div style={styles.messagesContainer}>
        {messages.map((msg, i) => {
          const isOwn = msg.user === username;
          return (
            <div key={i} style={styles.messageRow(isOwn)}>
              <div style={styles.messageBubble(isOwn)}>
                {!isOwn && <div style={styles.username}>{msg.user}</div>}
                <div>{msg.text}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écris un message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button style={styles.button} onClick={sendMessage}>
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default Chat;
