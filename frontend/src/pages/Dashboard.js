import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

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

  return (
    <div className="users">
      <h2>Users</h2>
      <ul>
        {!users ? (
          <li>No users to display</li>
        ) : (
          users.map((user) => (
            <li>
              {user.email} | {user.password}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
