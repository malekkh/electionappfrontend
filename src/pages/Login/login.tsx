import { useState } from "react";
import { useLogin } from "./useLogin";
import "./login.css"; // Import CSS file

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ userName, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>تسجيل دخول</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        {mutation.isError && <p className="error-text">Error: {mutation.error.message}</p>}
      </div>
    </div>
  );
};

export default Login;
