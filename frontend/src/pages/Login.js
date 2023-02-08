import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, message, isLoading } = useLogin();
  const { user } = useAuthContext();

  // Redirect user to homepage if they are already logged in
  if (user) {
    return <Navigate to="/" />;
  }

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
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      {error && <div>{error}</div>}
      {message && <div>{message}</div>}
    </form>
  );
};

export default Login;
