import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';
import Button from '../components/Button';
import Input from '../components/Input';

const ProjectDetail = () => {
  const [project, setProject] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [updatedProjectData, setUpdatedProjectData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/projects/${id}`)
      .then(response => {
        setProject(response.data);
        setUpdatedProjectData({ title: response.data.title, description: response.data.description });
      })
      .catch(error => {
        console.error('Error al obtener el proyecto:', error);
      });
  }, [id]);

  const handleEditChange = (e) => {
    setUpdatedProjectData({ ...updatedProjectData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`/api/projects/${id}`, updatedProjectData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProject(response.data);
      setShowEditPopup(false);
    } catch (error) {
      console.error('Error al editar el proyecto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      setIsDeleting(true);

      try {
        await axios.delete(`/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        navigate('/projects');
      } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
  };

  return (
    <div className="project-detail-container">
      {project ? (
        <>
          <h2>{project.title}</h2>

          <div className="project-description-container">
            <p>{project.description}</p>
          </div>

          <div className="button-container">
            <Button onClick={() => navigate('/projects')}>Volver a la lista de proyectos</Button>

            <Button onClick={() => setShowEditPopup(true)} className="edit-btn">
              Editar Proyecto
            </Button>

            <Button onClick={handleDelete} className="delete-btn" disabled={isDeleting}>
              {isDeleting ? 'Eliminando...' : 'Eliminar Proyecto'}
            </Button>
          </div>

          {showEditPopup && (
            <div className="popup-container">
              <div className="popup-overlay" onClick={handleClosePopup}></div>
              <div className="popup-content">
                <h3>Editar Proyecto</h3>
                <form onSubmit={handleEditSubmit}>
                  <Input
                    type="text"
                    name="title"
                    value={updatedProjectData.title}
                    onChange={handleEditChange}
                    placeholder="Título del Proyecto"
                    className="mb-4"
                  />
                  <textarea
                    name="description"
                    value={updatedProjectData.description}
                    onChange={handleEditChange}
                    placeholder="Descripción del Proyecto"
                    className="textarea mb-4"
                  />
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleClosePopup}
                    className="w-full mt-2 bg-gray-500 hover:bg-gray-700"
                  >
                    Cancelar
                  </Button>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ProjectDetail;
