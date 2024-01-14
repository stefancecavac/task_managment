import { useState, useEffect } from 'react';

const Manager = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/users'); 
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); 

  return (
    <div>
      <h1>Manager Page</h1>
      <p>List of all employees:</p>
        {users && users.map((user) => (
          <p key={user._id}> {user.email}</p>
        ) )}
    </div>
  );
};

export default Manager;
