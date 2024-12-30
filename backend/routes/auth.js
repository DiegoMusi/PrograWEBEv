const express = require('express');
const router = express.Router();
const User = require('../models/User');
const generateToken = require('../config/jwt');

// Registro de usuarios
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Datos recibidos:", { username, email, password });
  try {
    // Primero comprobamos que el usuario no exista
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    // Creamos el nuevo usuario
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Nuevo token
    const token = generateToken(newUser._id);

    res.status(201).json({ message: 'Usuario registrado con éxito', token });

  } catch (error) {
    console.error('Error en el registro:', error); // Error
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});



// Login de usuarios
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = generateToken(user._id);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
