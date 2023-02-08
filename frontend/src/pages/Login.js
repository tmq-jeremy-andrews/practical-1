import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, Navigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Alert,
} from "@mui/material";

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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        bgcolor: "primary.main",
      }}
    >
      <Grid item xs={3}>
        <Paper variant="outlined" sx={{ p: 1 }}>
          <div className="login-wrapper">
            <Typography variant="h4" sx={{ mt: 2, ml: 1, mr: 1 }}>
              Log In
            </Typography>
            <form className="signup" onSubmit={handleSubmit}>
              <TextField
                type="email"
                required
                label="Email"
                onChange={(event) => setEmail(event.target.value)}
                sx={{ mt: 1, ml: 1, mr: 1 }}
                value={email}
              />
              <br />
              <TextField
                type="password"
                required
                label="Password"
                onChange={(event) => setPassword(event.target.value)}
                sx={{ mt: 1, ml: 1, mr: 1 }}
                value={password}
              />
              {error && (
                <Alert severity="error" sx={{ mt: 1, ml: 1, mr: 1 }}>
                  {error}
                </Alert>
              )}
              {message && (
                <Alert severity="success" sx={{ mt: 1, ml: 1, mr: 1 }}>
                  {message}
                </Alert>
              )}
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button
                  disabled={isLoading}
                  type="submit"
                  variant="contained"
                  sx={{ mr: 1, mb: 1, mt: 1 }}
                >
                  Log In
                </Button>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 1, mb: 1 }}
              >
                <Typography>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </Typography>
              </Box>
            </form>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
