import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
} from "@mui/material";

const Dashboard = () => {
  const [users, setUsers] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Box container sx={{ p: 1, bgcolor: "primary.main", minHeight: "100vh" }}>
      <Paper sx={{ pl: 5, pb: 5, pr: 5, pt: 2, bgcolor: "#f7f7f7" }}>
        <Box
          component="span"
          m={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3">Users</Typography>
          <Button variant="contained">Log Out</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!users ? (
                <TableRow
                  colspan={3}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>No users to display</TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow
                    colspan={3}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{user._id}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Dashboard;
