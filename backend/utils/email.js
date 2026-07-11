const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

async function sendResetPasswordEmail(to, token) {
  const resetLink = `http://localhost:5173/reset-password?token=${token}`;
  
  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to: to,
    subject: 'Recuperación de Contraseña - Planificador',
    html: `
      <h2>Recuperación de Contraseña</h2>
      <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva:</p>
      <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background-color:#0891b2;color:#fff;text-decoration:none;border-radius:5px;">Restablecer Contraseña</a>
      <p>Si no solicitaste esto, ignora este correo.</p>
      <p>El enlace expirará en 1 hora.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendResetPasswordEmail };
