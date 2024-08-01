import { verifyToken } from './jwt';

export function isAdmin(req) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return false;

  const decoded = verifyToken(token);
  return decoded && decoded.role === 'admin';
}
