import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, message, isLoading } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Log In</button>
      {error && <div>{error}</div>}
      {message && <div>{message}</div>}
    </form>
  );
};

export default Login;
