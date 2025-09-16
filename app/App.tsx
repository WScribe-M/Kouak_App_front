"use client";

import { useState } from "react";
import Register from "../components/register";
import Login from "../components/login";
import Chat from "../components/chat";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [mode, setMode] = useState<"choose" | "login" | "register">("choose");

  if (token) {
    return <Chat token={token} />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      {mode === "choose" && (
        <>
          <h1 style={{ fontSize: "2.5rem", letterSpacing: "1px" }}>
            Bienvenue sur le <span style={{ color: "#16A34A" }}>Chat</span>
          </h1>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#4F46E5",
                color: "#fff",
              }}
              onClick={() => setMode("login")}
            >
              Se connecter
            </button>
            <button
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#16A34A",
                color: "#fff",
              }}
              onClick={() => setMode("register")}
            >
              S'inscrire
            </button>
          </div>
        </>
      )}

      {mode === "login" && <Login setToken={setToken} />}
      {mode === "register" && <Register setToken={setToken} />}

      {mode !== "choose" && (
        <button
          style={{
            marginTop: "1rem",
            background: "transparent",
            border: "none",
            color: "#4F46E5",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => setMode("choose")}
        >
          Retour au choix
        </button>
      )}
    </div>
  );
}

export default App;
