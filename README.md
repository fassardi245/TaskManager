# Task Manager – Plataforma de Gestión de Flujos de Trabajo

Una aplicación web full-stack interactiva orientada a la productividad personal, diseñada para centralizar la administración de tareas diarias mediante un panel de control dinámico, fluido y responsivo.

---

## 🚀 Características Clave

* **Autenticación Segura:** Flujo de registro e inicio de sesión protegido e integrado a nivel de rutas.
* **Operaciones CRUD Completas:** Arquitectura preparada para la creación, lectura y eliminación de tareas en tiempo real.
* **Filtrado Dinámico:** Organización instantánea de tareas según su estado (Completadas, Incompletas) o su nivel de prioridad (Importantes).
* **Persistencia Robusta:** Modelado de datos eficiente con sincronización directa a una base de datos distribuida.
* **Interfaz de Usuario Avanzada:** Diseño moderno en modo oscuro enfocado en la experiencia de usuario (UX), con transiciones fluidas y alertas interactivas.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
* **React & Next.js:** Arquitectura basada en componentes y aprovechamiento del renderizado híbrido (*Client-side Rendering* / *Server-side Rendering*).
* **TypeScript:** Tipado estático y robusto para la prevención de errores en tiempo de compilación.
* **Tailwind CSS:** Estilizado ágil y responsivo mediante clases de utilidad utilitarias de última generación.
* **Styled Components:** Componentes estilizados dinámicamente mediante la inyección de props basadas en contextos globales y un sistema de temas centralizado.

### Backend & Persistencia
* **Node.js:** Entorno de ejecución asíncrono para la lógica del servidor.
* **Next.js API Routes:** Rutas de API internas para la manipulación y despacho de recursos de manera desacoplada.
* **Prisma ORM:** Capa de abstracción y mapeo relacional de objetos para interactuar con la base de datos de manera tipeada y segura.
* **MongoDB:** Base de datos NoSQL documental utilizada para el almacenamiento flexible y eficiente de los registros de tareas.

### Herramientas y Servicios Externos
* **Clerk:** Gestión integral de autenticación, sesiones y seguridad de usuarios en el cliente y servidor.
* **Axios:** Cliente HTTP basado en promesas para la ejecución limpia de peticiones asíncronas hacia la API.
* **React Hot Toast:** Sistema reactivo de notificaciones dinámicas para proveer feedback inmediato al usuario tras cada operación.
