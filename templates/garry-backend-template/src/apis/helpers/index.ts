export const asNumber = (value: unknown): number | null => {
  const num = typeof value === 'string' ? Number(value) : typeof value === 'number' ? value : NaN;
  return Number.isFinite(num) ? num : null;
};

export { authMiddleware } from './authMiddleware';
