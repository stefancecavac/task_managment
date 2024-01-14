import { useState, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useUserContext();
  const navigateTo = useNavigate();

  useEffect(() => {
    // Fetch the list of users to populate the dropdown
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/users', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          setError('Error fetching users.');
          return;
        }

        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        setError('Error fetching users.');
      }
    };

    fetchUsers();
  }, [user.token]);

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, date, assigned_user: selectedUser }),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      setDate('');
      setTitle('');
      setSelectedUser('');
      navigateTo('/');
    }
  };

  return (
    <div className="addtask">
      <form name="addTaskForm" onSubmit={submit}>
        <h1>New Task:</h1>
        <label>Title:</label>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label>Date:</label>
        <input
          type='date'
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />

        <label>Assign to:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.email}
            </option>
          ))}
        </select>

        <button type="submit">Add Task</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default NewTask;
