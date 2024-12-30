# Proyecto de Gestión de Proyectos

Este es un sistema completo de gestión de proyectos que incluye funcionalidades como registro de usuarios, autenticación segura con JWT, gestión de proyectos (creación, edición, eliminación y búsqueda), y una interfaz moderna e interactiva construida con React.

## Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Características Principales](#características-principales)
3. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
4. [Tecnologías Utilizadas](#tecnologías-utilizadas)
5. [Casos de Uso](#casos-de-uso)
---

## Descripción del Proyecto

El objetivo de este proyecto es permitir a los usuarios gestionar sus proyectos mediante una interfaz fácil de usar. Los usuarios pueden registrarse, iniciar sesión y acceder a una lista de proyectos que pueden buscar, editar, eliminar o crear. La aplicación incluye una autenticación segura para proteger los datos del usuario y asegurar que solo los propietarios puedan modificar sus proyectos.

## Características Principales

1. **Autenticación segura**:
   - Registro de nuevos usuarios.
   - Inicio de sesión con JSON Web Tokens (JWT).
   - Protección de rutas basadas en la autenticación.

2. **Gestión de proyectos**:
   - Crear nuevos proyectos con título y descripción.
   - Listar proyectos del usuario autenticado.
   - Buscar proyectos por título.
   - Editar y eliminar proyectos existentes.

3. **Base de datos**:
   - Colección de usuarios.
   - Colección de proyectos con relaciones basadas en los usuarios.

4. **Interfaz moderna**:
   - Diseño responsivo y limpio con React.
   - Uso de popups para tareas específicas como edición y creación de proyectos.

---

## Arquitectura del Proyecto

El proyecto sigue una arquitectura cliente-servidor:

1. **Frontend (React)**:
   - Maneja la interacción con el usuario.
   - Consume la API del backend mediante Axios.
   - Implementa componentes reutilizables como botones, formularios y tarjetas.

2. **Backend (Node.js y Express)**:
   - Proporciona una API RESTful para las operaciones CRUD de usuarios y proyectos.
   - Implementa autenticación segura con JWT.
   - Gestiona la base de datos utilizando MongoDB.

3. **Base de Datos (MongoDB)**:
   - Almacena la información de los usuarios y sus proyectos.



## Tecnologías Utilizadas

- **Frontend**:
- React
- Axios (para peticiones HTTP)
- CSS (App.css)

- **Backend**:
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)

- **Base de Datos**:
- MongoDB

---


## Casos de Uso

1. **Registro de usuarios**:
   - Un usuario puede registrarse proporcionando su correo, contraseña y nombre de usuario.

2. **Autenticación y protección de rutas**:
   - Solo los usuarios autenticados pueden acceder a la lista de proyectos y sus detalles.

3. **Gestión de proyectos**:
   - Los usuarios pueden:
     - Crear nuevos proyectos.
     - Ver una lista de sus proyectos.
     - Editar proyectos existentes.
     - Eliminar proyectos.

4. **Búsqueda**:
   - Los usuarios pueden buscar proyectos por título.

---