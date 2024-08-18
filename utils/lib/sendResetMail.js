import nodemailer from 'nodemailer';

export default async function sendResetEmail(to, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred email service
    auth: {
      user: process.env.NEXT_PRIVATE_EMAIL,
      pass: process.env.NEXT_PRIVATE_PASS,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/admin-reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.NEXT_PRIVATE_EMAIL,
    to,
    subject: 'Password Reset',
    html: `
      <p>You requested a password reset</p>
      <a style={{textDecoration:"none"}} href="${resetLink}"><button style={{background:"green"; padding:"5px 10px"; borderRadius:"10px";}}> Click to reset your password </button></a> 
    `,
  };

  return transporter.sendMail(mailOptions);
}
