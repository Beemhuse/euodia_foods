import { verifyToken } from './jwt';

export function isAdmin(headers) {
  console.log("isAdmin ==>?>>>", headers)
  
  // const authHeader = headers['authorization'];
  // if (!authHeader) return false;
  
  const token = headers.split(' ')[1];
  console.log("isAdmin ==>?>>>", token)
  if (!token) return false;

  try {
    const decoded = verifyToken(token);
    return decoded && decoded.role === 'admin';
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}
