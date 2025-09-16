"use client";

import { useState } from "react";
import api from "../app/api/axiosInstance";

interface LoginProps {
  setToken: (token: string) => void;
}

function Login({ setToken }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
    try {
        const res = await api.post("/login", { email, password });
        setToken(res.data.token); // ton backend doit renvoyer { token }
    } catch (err) {
        alert("Erreur de connexion");
    }
};

// Simple styles
const styles = {
    container: {
        maxWidth: "350px",
        margin: "60px auto",
        padding: "32px",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: "20px",
    },
    input: {
        width: "100%",
        padding: "12px",
        border: "1px solid #bfc9d9",
        borderRadius: "8px",
        fontSize: "16px",
        marginBottom: "12px",
        background: "#f5f7fa",
        outline: "none",
        transition: "border 0.2s",
    },
    button: {
        width: "100%",
        padding: "12px",
        background: "linear-gradient(90deg, #0070f3 0%, #0051a8 100%)",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold" as const,
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,112,243,0.10)",
        transition: "background 0.2s, transform 0.1s",
    },
    buttonHover: {
        background: "linear-gradient(90deg, #0051a8 0%, #0070f3 100%)",
        transform: "translateY(-2px)",
    },
    title: {
        marginBottom: "16px",
        color: "#222",
        fontWeight: "bold" as const,
        fontSize: "2rem",
        letterSpacing: "1px",
    },
};

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Connexion</h2>
      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleLogin}>
        Se connecter
      </button>
    </div>
  );
}

export default Login;
