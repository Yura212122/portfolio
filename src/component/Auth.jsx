import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🔹 вже є

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // ✅ обовʼязково додай цю строку

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegister) {
        await axios.post("http://localhost:5000/register", { email, password });
        alert("Реєстрація успішна");

        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDA2fRePEnNxhERgP3YjMnZJSCOCygSaR0",
          {
            email,
            password,
            returnSecureToken: true,
          }
        );
        const token = response.data.idToken;
        setUser({ email, token });
        navigate("/main"); // ✅ перенаправлення
      } else {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDA2fRePEnNxhERgP3YjMnZJSCOCygSaR0",
          {
            email,
            password,
            returnSecureToken: true,
          }
        );
        const token = response.data.idToken;
        setUser({ email, token });
        navigate("/main"); // ✅ перенаправлення
      }
    } catch (err) {
      setError(err.response?.data?.message || "Помилка автентифікації");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>{isRegister ? "Реєстрація" : "Вхід"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          {isRegister ? "Зареєструватися" : "Увійти"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p
        style={{ marginTop: 10, cursor: "pointer", color: "blue" }}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? "Вже є акаунт? Увійти" : "Нема акаунта? Зареєструватися"}
      </p>
    </div>
  );
};

export default Auth;
