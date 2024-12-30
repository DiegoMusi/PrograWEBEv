import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from '../axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validar campos rellenados
    if (!formData.username || !formData.email || !formData.password) {
      setError('Por favor complete todos los campos');
      setLoading(false);
      return;
    }

    try {
      // Enviar solicitud de registro
      const response = await axios.post('/api/auth/register', formData);
      const token = response.data.token;

      if (token) {
        // Guardar el token en el almacenamiento local
        localStorage.setItem('token', token);

        // Redirigir al panel de proyectos
        navigate('/projects');
      } else {
        setError('No se pudo obtener el token. Intente nuevamente.');
      }
    } catch (error) {
      setError('Error al registrarse, intente nuevamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container flex items-center justify-center h-screen bg-gray-100">
      <div className="register-form bg-white p-8 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Registrarse</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            className="mb-4"
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="mb-4"
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="mb-4"
          />

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Registrar'}
          </Button>
        </Form>

        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => navigate('/login')}
            className="bg-gray-500 hover:bg-gray-700 text-white"
          >
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
