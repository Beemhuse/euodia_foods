import jwt from 'jsonwebtoken';

const secretKey = process.env.NEXT_PRIVATE_JWT_SECRET_KEY;

export function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}
