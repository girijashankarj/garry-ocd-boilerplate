import React from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import { useUsers } from '../hooks/useUsers';

export default function UserDashboard() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();

  return (
    <div className="stack">
      <div className="hero">
        <div>
          <h1>Garry Users Portal</h1>
          <p>Manage users with a CSV-backed data layer (no API required).</p>
        </div>
      </div>

      {error ? <div className="alert">{error}</div> : null}
      {loading ? <div className="alert">Loading...</div> : null}

      <div className="grid">
        <UserForm onCreate={createUser} />
        <UserList users={users} onUpdate={updateUser} onDelete={deleteUser} />
      </div>
    </div>
  );
}
