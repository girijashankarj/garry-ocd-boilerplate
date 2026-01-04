import React, { useState } from 'react';
import type { UpdateUserInput, User, UserRole } from '../common/types';

const ROLES: UserRole[] = ['admin', 'editor', 'viewer'];

type Props = {
  users: User[];
  onUpdate: (input: UpdateUserInput) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
};

export default function UserList({ users, onUpdate, onDelete }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<UpdateUserInput | null>(null);

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setDraft({ id: user.id, name: user.name, email: user.email, role: user.role });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const saveEdit = () => {
    if (!draft) return;
    void onUpdate(draft);
    cancelEdit();
  };

  return (
    <div className="card">
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {editingId === user.id ? (
                    <input
                      value={draft?.name || ''}
                      onChange={(e) => setDraft({ ...draft!, name: e.target.value })}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <input
                      value={draft?.email || ''}
                      onChange={(e) => setDraft({ ...draft!, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <select
                      value={draft?.role || 'viewer'}
                      onChange={(e) =>
                        setDraft({ ...draft!, role: e.target.value as UserRole })
                      }
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <div className="actions">
                      <button onClick={saveEdit}>Save</button>
                      <button onClick={cancelEdit} className="ghost">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="actions">
                      <button onClick={() => startEdit(user)} className="ghost">
                        Edit
                      </button>
                      <button onClick={() => onDelete(user.id)} className="danger">
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
