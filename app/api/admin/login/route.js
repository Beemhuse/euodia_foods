import { getAdminIdByEmail } from '@/utils/lib/getUserIdByEmail';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Function to generate a random secret key
const generateRandomSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Retrieve user from Sanity (implement this function)
    const user = await getAdminIdByEmail(email);

    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const secretKey = generateRandomSecret();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '7d' });

    return new Response(JSON.stringify({ message: 'Admin signed in successfully!', user, token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
