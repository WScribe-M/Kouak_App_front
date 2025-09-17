"use client";

import React, { useState } from "react";
import axiosInstance from "../app/api/axiosInstance";

interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        mot_de_passe: password, // Correspond au backend
      });

      const data = response.data;

      if (!data.token) {
        setError("Connexion échouée : pas de token retourné");
        return;
      }

      // Remonter le token au parent
      setToken(data.token);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur réseau");
    }
  };

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
    title: {
      marginBottom: "16px",
      color: "#222",
      fontWeight: "bold" as const,
      fontSize: "2rem",
      letterSpacing: "1px",
    },
    error: {
      color: "red",
      marginBottom: "12px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Connexion</div>
      {error && <div style={styles.error}>{error}</div>}
      <input
        style={styles.input}
        placeholder="Email"
        type="email"
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
      <button style={styles.button} onClick={handleSubmit}>
        Se connecter
      </button>
    </div>
  );
};

export default Login;
