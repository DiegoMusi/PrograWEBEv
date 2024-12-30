const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("MONGO_URI no está definida en el archivo .env");
      process.exit(1);
    }

    await mongoose.connect(uri);

    console.log('Conexión exitosa con MongoDB');
  } catch (err) {
    console.error('Error conectando con MongoDB:', err);
    process.exit(1); // ERROR
  }
};

module.exports = connectDB;
