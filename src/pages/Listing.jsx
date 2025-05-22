import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getUsers } from '../utils/api';

const Listing = () => {
  const { token, user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsers(token);
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Users</h2>
      <ul className="space-y-2">
        {users.map((u) => (
          <li
            key={u._id}
            className="p-3 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
            onClick={() => navigate(`/consultation/${u._id}`)}
          >
            {u.email} ({u.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listing;