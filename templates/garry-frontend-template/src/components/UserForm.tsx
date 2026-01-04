import React, { useState } from 'react';
import type { CreateUserInput, UserRole } from '../common/types';

const ROLES: UserRole[] = ['admin', 'editor', 'viewer'];

type Props = {
  onCreate: (input: CreateUserInput) => Promise<void> | void;
};

export default function UserForm({ onCreate }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('viewer');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    void onCreate({ name: name.trim(), email: email.trim(), role });
    setName('');
    setEmail('');
    setRole('viewer');
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Create User</h2>
      <div className="form-row">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
      </div>
      <div className="form-row">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@email.com" />
      </div>
      <div className="form-row">
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add user</button>
    </form>
  );
}
