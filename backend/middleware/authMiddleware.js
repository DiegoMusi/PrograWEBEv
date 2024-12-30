const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token2 = req.header('authorization');
  const token=token2 &&token2.split(" ")[1];
  if (!token) return res.status(401).send('Acceso denegado');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Si se verifica almacenamos los datos del usuario
    next();
  } catch (err) {
    res.status(400).send('Token inválido');
  }
};

module.exports = authMiddleware;
