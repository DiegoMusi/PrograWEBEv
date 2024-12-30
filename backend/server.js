const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const passwordReset = require('./routes/passwordReset'); 
const cors = require('cors');


console.log(process.env.MONGO_URI);
const app = express();

connectDB();

app.use(express.json());
app.use(cors());


// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/passwordReset', projectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
