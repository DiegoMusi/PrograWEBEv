import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import Button from '../components/Button';
import Input from '../components/Input';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [emailForReset, setEmailForReset] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor complete todos los campos');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/projects');
    } catch (error) {
      setError('Credenciales inválidas');
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordPopup(true);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!emailForReset) {
      setError('Por favor ingrese un correo electrónico');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/forgot-password', { email: emailForReset });
      alert('Te hemos enviado un correo con las instrucciones para restablecer tu contraseña.');
      setShowForgotPasswordPopup(false);
    } catch (error) {
      setError('Error al enviar el correo, intenta nuevamente');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-text">{error}</p>}

        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="input-field"
        />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="input-field"
        />
        
        <Button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </Button>

        <div className="action-links">
          <Button
            onClick={() => navigate('/register')}
            className="register-btn"
            type="button"
          >
            Regístrate
          </Button>
          
            <a
            href="javascript:void(0)"
            className="forgot-password-link"
            onClick={handleForgotPasswordClick}
            >
            ¿Olvidaste tu contraseña?
            </a>
        </div>
      </form>

      {showForgotPasswordPopup && (
        <div className="popup-container">
          <div className="popup-overlay" onClick={() => setShowForgotPasswordPopup(false)}></div>
          <div className="popup-content">
            <h3>Recuperar Contraseña</h3>
            <form onSubmit={handleForgotPasswordSubmit}>
              <Input
                type="email"
                name="email"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                placeholder="Ingresa tu correo"
                className="input-field"
              />
              {error && <p className="error-text">{error}</p>}
              <Button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar correo'}
              </Button>
              <Button
                type="button"
                onClick={() => setShowForgotPasswordPopup(false)}
                className="cancel-btn"
              >
                Cancelar
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
