// pages/api/signin.js
import { getUserByEmail } from '@/utils/lib/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { getUserByEmail } from '../../lib/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  // Retrieve user from Sanity (implement this function)
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Check if the password is correct
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

  res.status(200).json({ user, token });
}
