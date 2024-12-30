const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const crypto = require('crypto');
const router = express.Router();

// Esto solo funcionará para Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'X@gmail.com',  // Si se hace se podrá el correo aqui
    pass: 'X'         // Contraseña
  }
});

// Ruta para enviar el correo de recuperación de contraseña
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Validar que el correo exista en la base de datos
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: 'No se encontró un usuario con ese correo' });
  }

  // Generar un token único de restablecimiento de contraseña
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000;  // El token expirará en 1 hora
  await user.save();

  // Crear el enlace de recuperación de contraseña
  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

  // Configurar el correo de recuperación
  const mailOptions = {
    to: email,
    from: 'X@gmail.com',
    subject: 'Recuperación de Contraseña',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).json({ msg: 'Error al enviar el correo', error: err });
    }
    res.status(200).json({ msg: 'Te hemos enviado un correo con las instrucciones para restablecer tu contraseña.' });
  });
});

module.exports = router;
