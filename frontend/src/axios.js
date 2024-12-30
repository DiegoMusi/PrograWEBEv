import axios from 'axios';

// Aquí se define la URL base de la API
const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

// Configura un interceptor para agregar el token JWT a las peticiones, si está disponible
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtener el token de localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Agregamos el token a la cabecera
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
