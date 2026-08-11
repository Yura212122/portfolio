import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Логін
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // 2. Отримуємо ТОКЕН + claims (важливо true)
      const tokenResult = await userCred.user.getIdTokenResult(true);

      const token = tokenResult.token;
      const role = tokenResult.claims.role ?? "user";

      // 3. Зберігаємо юзера в state
      const userData = {
        email: userCred.user.email,
        uid: userCred.user.uid,
        token,
        role,
      };

      setUser(userData);

      // 4. (опціонально) localStorage щоб не втрачати сесію
      localStorage.setItem("user", JSON.stringify(userData));

      // 5. Редірект по ролі
      if (role === "admin") {
        navigate("/main"); // або /admin
      } else {
        navigate("/main");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Помилка входу: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Вхід</h2>

        <form onSubmit={handleLogin}>
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

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Завантаження..." : "Увійти"}
          </button>
        </form>

        <p className="text-center mt-3">
          Ще немає акаунту?{" "}
          <Link to="/register" className="text-decoration-none">
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;