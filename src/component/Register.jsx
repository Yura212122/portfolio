import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Register({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken(true);

      // 🔹 ставимо роль user за замовчуванням
      setUser({
        email: userCred.user.email,
        token,
        role: "user",
      });

      navigate("/kitchen");
    } catch (err) {
      alert("❌ Помилка реєстрації: " + (err.message || "невідома"));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Реєстрація</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введіть email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введіть пароль"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Зареєструватися
          </button>
        </form>

        <p className="text-center mt-3">
          Вже маєте акаунт?{" "}
          <Link to="/login" className="text-decoration-none">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
