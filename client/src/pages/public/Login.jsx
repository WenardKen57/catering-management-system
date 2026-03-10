import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await loginUser({ email, password });

    login(data);

    if (data.user.role === "admin") navigate("/admin");
    else if (data.user.role === "manager") navigate("/manager");
    else if (data.user.role === "staff") navigate("/staff");
    else navigate("/customer");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Login</button>
    </form>
  );
}
