const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Project = require('../models/Project');

// Crear un nuevo proyecto
router.post('/', authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ msg: 'Por favor ingrese todos los campos' });
  }

  try {
    const newProject = new Project({
      title,
      description,
      userId: req.user.id
    });

    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (err) {
    console.error('Error al crear proyecto:', err);
    res.status(500).json({ msg: 'Hubo un error al crear el proyecto' });
  }
});

// Obtener proyectos del usuario autenticado, con soporte de búsqueda
router.get('/', authMiddleware, async (req, res) => {
  const { search } = req.query;

  try {
    // Construir una consulta condicional
    const query = { userId: req.user.id };

    if (search) {
        // Buscamos por titulo sin mayusculas
      query.title = { $regex: search, $options: 'i' };
    }

    const projects = await Project.find(query);

    if (projects.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron proyectos' });
    }

    res.json(projects);
  } catch (err) {
    console.error('Error al buscar proyectos:', err);
    res.status(500).json({ message: 'Error al buscar proyectos', error: err });
  }
});

// Obtener un proyecto por ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    // Verificar que el proyecto pertenece al usuario autenticado
    if (project.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'No autorizado' });
    }

    res.json(project);
  } catch (err) {
    console.error('Error al obtener proyecto:', err);
    res.status(500).json({ msg: 'Error al obtener proyecto', error: err });
  }
});

// Actualizar un proyecto por ID
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  // Validar que los campos esten rellenados
  if (!title || !description) {
    return res.status(400).json({ msg: 'Por favor ingrese todos los campos' });
  }

  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    // Verificar que el proyecto pertenece al usuario autenticado
    if (project.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'No autorizado' });
    }

    // Actualizar proyecto
    project.title = title;
    project.description = description;

    await project.save();
    res.json(project);
  } catch (err) {
    console.error('Error al actualizar proyecto:', err);
    res.status(500).json({ msg: 'Error al actualizar proyecto', error: err });
  }
});

// Eliminar un proyecto por ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    // Verificar que el proyecto pertenece al usuario autenticado
    if (project.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'No autorizado' });
    }

    // Eliminar el proyecto
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Proyecto eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar proyecto:', err);
    res.status(500).json({ msg: 'Hubo un error al eliminar el proyecto', error: err });
  }
});


module.exports = router;
