import type { User } from '../common/types';

const HEADER = ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'];

export const parseCsvUsers = (csv: string): User[] => {
  if (!csv.trim()) return [];
  const lines = csv.split('\n').filter(Boolean);
  if (lines.length <= 1) return [];
  const rows = lines.slice(1);
  return rows.map((line) => {
    const [id, name, email, role, createdAt, updatedAt] = line.split(',');
    return {
      id,
      name,
      email,
      role: (role || 'viewer') as User['role'],
      createdAt,
      updatedAt,
    };
  });
};

export const usersToCsv = (users: User[]): string => {
  const header = HEADER.join(',');
  const rows = users.map((user) =>
    [
      user.id,
      user.name,
      user.email,
      user.role,
      user.createdAt,
      user.updatedAt,
    ].join(',')
  );
  return [header, ...rows].join('\n');
};
