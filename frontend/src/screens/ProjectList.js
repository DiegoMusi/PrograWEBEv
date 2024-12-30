import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false); // Estado para el popup de búsqueda
  const [showCreateProject, setShowCreateProject] = useState(false); // Estado para el popup de creación
  const [newProjectData, setNewProjectData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Verificar si el token está presente, si no redirigir al login
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      fetchProjects(); // Cargar los proyectos al inicio
    }
  }, [navigate]);

  // Función para obtener proyectos, con o sin filtro de búsqueda
  const fetchProjects = async (query = '') => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`/api/projects${query}`);
      setProjects(response.data);
    } catch (err) {
      console.error('Error al obtener proyectos:', err);
      setError('No se encontraron proyectos.');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la búsqueda
  const handleSearch = () => {
    const searchQuery = search.trim() ? `?search=${search.trim()}` : '';
    fetchProjects(searchQuery);
    setShowSearchPopup(false);
  };

  // Manejo de log out
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Manejo de cambio en el formulario de nuevo proyecto
  const handleCreateProjectChange = (e) => {
    setNewProjectData({ ...newProjectData, [e.target.name]: e.target.value });
  };

  // Enviar formulario para crear nuevo proyecto
  const handleCreateProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validación de los campos rellenados
    if (!newProjectData.title || !newProjectData.description) {
      setError('Por favor ingrese todos los campos');
      setLoading(false);
      return;
    }

    try {
      // Crear el proyecto
      const response = await axios.post('/api/projects', newProjectData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProjects([response.data, ...projects]);  // Agregar el nuevo proyecto al inicio de la lista
      setShowCreateProject(false);
      setNewProjectData({ title: '', description: '' });
    } catch (error) {
      setError('Error al crear proyecto, intente nuevamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="project-list">
      <div className="header">
        <Button onClick={() => setShowCreateProject(true)}>+ Nuevo Proyecto</Button>
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </div>

      <div className="search-bar">
        <Button onClick={() => setShowSearchPopup(true)}>Buscar Proyectos</Button>
      </div>

      {/* Pop-up para buscar proyectos */}
      {showSearchPopup && (
        <div className="popup-container">
          <div className="popup-overlay" onClick={() => setShowSearchPopup(false)}></div>
          <div className="popup-content">
            <h3>Buscar Proyecto</h3>
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre"
              className="mb-4"
            />
            <Button onClick={handleSearch}>Buscar</Button>
            <Button
              type="button"
              className="w-full mt-2 bg-gray-500 hover:bg-gray-700"
              onClick={() => setShowSearchPopup(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Pop-up para crear nuevo proyecto */}
      {showCreateProject && (
        <div className="popup-container">
          <div className="popup-overlay" onClick={() => setShowCreateProject(false)}></div>
          <div className="popup-content">
            <h3>Crear Nuevo Proyecto</h3>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <form onSubmit={handleCreateProjectSubmit}>
              <Input
                type="text"
                name="title"
                value={newProjectData.title}
                onChange={handleCreateProjectChange}
                placeholder="Título del proyecto"
                className="mb-4"
              />
                <textarea
                name="description"
                value={newProjectData.description}
                onChange={handleCreateProjectChange}
                placeholder="Descripción del proyecto"
                className="w-full mb-4 p-3 border rounded-md resize-none h-32"
                />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creando...' : 'Crear Proyecto'}
              </Button>
              <Button
                type="button"
                className="w-full mt-2 bg-gray-500 hover:bg-gray-700"
                onClick={() => setShowCreateProject(false)}
              >
                Cancelar
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Contenedor de tarjetas de proyectos */}
      <div className="project-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map(project => (
          <Card
            key={project._id}
            title={project.title}
            description={project.description}
            onClick={() => navigate(`/projects/${project._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
