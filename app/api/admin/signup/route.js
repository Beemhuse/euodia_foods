// pages/api/signup.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import crypto from 'crypto';
import { createAdmin, getAdminByEmail,   } from '@/utils/sanity/client';

// Function to generate a random secret key
const generateRandomSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

export  async function POST(req) {
 
  try{

      const res = await req.json()
      const { name, email, password } = res;
      const existingUser = await getAdminByEmail(email);
    
      if (existingUser) {
        return new Response(JSON.stringify({ message: 'Admin with this email already exists' }), {
            status: 409,
            headers: { 'Content-Type': 'application/json' }
          });
      }
    
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        id: uuidv4(),
        email,
        name,
        password: hashedPassword,
      };
      const newUser = await createAdmin(user);
    
      const secretKey = generateRandomSecret();
      const expiresIn = 7 * 24 * 60 * 60; // 7 days in seconds
    
      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id  }, secretKey, { expiresIn: expiresIn });
    return new Response(JSON.stringify({ message: 'Admin signed up successfully!', user: newUser, token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    //   res.status(201).json({ user: newUser, token });
  }
  catch(err){
    return new Response(JSON.stringify({ message: 'An error occurred' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
  }

}
