# **Shoply Backend** 🛍️

> Este backend se complementa con el frontend disponible en: [Shoply Frontend](https://github.com/EmilianoBechard/front-shoply)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

Backend para **Shoply**, una API RESTful desarrollada con **Node.js**, **Express** y **Zod** para validaciones, que gestiona usuarios, productos e imágenes.  
Implementa **CORS personalizado**, validaciones robustas, subida de imágenes y un sistema de autorización para administradores.

---

## **📌 Características principales**

✅ API RESTful organizada con **Express**.  
✅ Validaciones sólidas con **Zod**.  
✅ Middleware de **CORS personalizado**.  
✅ Subida y gestión de imágenes con **Multer**.  
✅ Manejo de usuarios y roles (**admin**).  
✅ Generación de **slugs** para productos.  
✅ Sistema completo de validaciones y manejo de errores.

---

## **📂 Estructura del proyecto**

```
shoply-backend/
├── controllers/       # Controladores de usuarios y productos
├── middlewares/       # Middlewares personalizados (CORS, checkAdmin, etc.)
├── models/            # Lógica de negocio y persistencia en JSON
├── routes/            # Definición de endpoints para usuarios y productos
├── schemas/           # Validaciones con Zod
├── utils/             # Funciones auxiliares (capitalize, slug, etc.)
├── products_images/   # Carpeta donde se guardan imágenes de productos
├── usuarios.json      # Base de datos local de usuarios
├── productos.json     # Base de datos local de productos
├── package.json
└── server.js          # Punto de entrada del servidor
```

---

## **⚙️ Instalación**

### **1. Clonar el repositorio**

```bash
git clone https://github.com/tuusuario/shoply-backend.git
cd shoply-backend
```

### **2. Instalar dependencias**

```bash
npm install
```

### **3. Configurar variables de entorno** _(opcional)_

Crea un archivo `.env` en la raíz del proyecto si necesitas personalizar configuraciones:

```env
PORT=8080
ACCEPTED_ORIGINS=http://localhost:3000,https://tudominio.com
```

---

## **🚀 Ejecución**

### **Modo desarrollo**

```bash
npm run dev
```

### **Modo producción**

```bash
npm start
```

Por defecto, la API estará disponible en:

```
http://localhost:8080
```

---

## **📡 Endpoints principales**

### **Usuarios** 👤

| Método | Endpoint        | Descripción                  | Autenticación |
| ------ | --------------- | ---------------------------- | ------------- |
| GET    | `/usuarios`     | Inicia sesión de usuario     | ❌            |
| POST   | `/usuarios`     | Registra un nuevo usuario    | ❌            |
| PATCH  | `/usuarios/:id` | Actualiza parcialmente datos | ✅            |
| PUT    | `/usuarios/:id` | Actualiza todos los datos    | ✅            |
| DELETE | `/usuarios/:id` | Elimina un usuario           | ✅            |

---

### **Productos** 🛒

| Método | Endpoint               | Descripción                           | Autenticación |
| ------ | ---------------------- | ------------------------------------- | ------------- |
| GET    | `/productos`           | Obtiene todos los productos           | ❌            |
| POST   | `/productos`           | Crea un producto nuevo                | ✅ (admin)    |
| DELETE | `/productos/:id`       | Elimina un producto                   | ✅ (admin)    |
| PATCH  | `/productos/carousel`  | Activa/desactiva producto en carrusel | ✅ (admin)    |
| PATCH  | `/productos/destacado` | Activa/desactiva producto destacado   | ✅ (admin)    |

---

## **🛡️ Middlewares**

### **1. CORS personalizado**

```js
const ACCEPTED_ORIGINS = ["https://shoply.com"];
```

Permite definir **dominios** o **IPs** autorizadas para acceder al backend.

### **2. checkAdmin**

- Verifica si un usuario es administrador antes de permitir ciertas operaciones.
- Protege endpoints sensibles como creación, eliminación o modificación de productos.

---

## **🛠️ Tecnologías utilizadas**

| Tecnología       | Uso                        |
| ---------------- | -------------------------- |
| Node.js          | Entorno de ejecución       |
| Express          | Framework backend          |
| Zod              | Validaciones               |
| Multer           | Subida de imágenes         |
| CORS             | Control de orígenes        |
| FS / FS-Promises | Persistencia local en JSON |

---

## **📸 Subida de imágenes**

Las imágenes se guardan automáticamente en la carpeta `products_images/` y se sirven de forma estática a través de:

```
http://localhost:8080/products_images/<nombre_imagen>
```

---

## **🤝 Contribuciones**

¡Las contribuciones son bienvenidas!  
Haz un **fork**, crea una **rama** y envía un **pull request**.

---

## **📜 Licencia**

Este proyecto está bajo la licencia **MIT**.  
Puedes usarlo, modificarlo y distribuirlo libremente.

---

# **Shoply Backend** 🛍️ _(English)_

 This backend complements the backend available at: [Shoply Frontend](https://github.com/EmilianoBechard/front-shoply)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

Backend for **Shoply**, a **RESTful API** built with **Node.js**, **Express**, and **Zod** for data validation.  
It manages **users, products, images**, and includes **custom CORS**, image upload, authentication, and admin authorization.

---

## **📌 Main Features**

✅ Organized **RESTful API** using **Express**.  
✅ Strong data validation with **Zod**.  
✅ **Custom CORS** middleware support.  
✅ Image upload and management with **Multer**.  
✅ User management and **admin roles**.  
✅ Automatic **slug generation** for products.  
✅ Complete error handling and validation system.

---

## **📂 Project Structure**

```
shoply-backend/
├── controllers/       # User and product controllers
├── middlewares/       # Custom middlewares (CORS, checkAdmin, etc.)
├── models/            # Business logic and JSON-based persistence
├── routes/            # API routes for users and products
├── schemas/           # Input validations using Zod
├── utils/             # Helper functions (capitalize, slug, etc.)
├── products_images/   # Directory for uploaded product images
├── usuarios.json      # Local JSON-based users database
├── productos.json     # Local JSON-based products database
├── package.json
└── server.js          # Server entry point
```

---

## **⚙️ Installation**

### **1. Clone the repository**

```bash
git clone https://github.com/yourusername/shoply-backend.git
cd shoply-backend
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Configure environment variables** _(optional)_

Create a `.env` file in the project root to customize settings:

```env
PORT=8080
ACCEPTED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

---

## **🚀 Running the Project**

### **Development mode**

```bash
npm run dev
```

### **Production mode**

```bash
npm start
```

Default API URL:

```
http://localhost:8080
```

---

## **📡 Main Endpoints**

### **Users** 👤

| Method | Endpoint        | Description           | Auth |
| ------ | --------------- | --------------------- | ---- |
| GET    | `/usuarios`     | Log in user           | ❌   |
| POST   | `/usuarios`     | Register new user     | ❌   |
| PATCH  | `/usuarios/:id` | Partially update user | ✅   |
| PUT    | `/usuarios/:id` | Fully update user     | ✅   |
| DELETE | `/usuarios/:id` | Delete user           | ✅   |

---

### **Products** 🛒

| Method | Endpoint               | Description                     | Auth       |
| ------ | ---------------------- | ------------------------------- | ---------- |
| GET    | `/productos`           | Get all products                | ❌         |
| POST   | `/productos`           | Create new product              | ✅ (admin) |
| DELETE | `/productos/:id`       | Delete product                  | ✅ (admin) |
| PATCH  | `/productos/carousel`  | Enable/disable carousel product | ✅ (admin) |
| PATCH  | `/productos/destacado` | Enable/disable featured product | ✅ (admin) |

---

## **🛡️ Middlewares**

### **1. Custom CORS**

```js
const ACCEPTED_ORIGINS = ["https://shoply.com"];
```

Defines the **allowed domains** or **IPs** that can access the API.

### **2. checkAdmin**

- Ensures the user has admin privileges before executing restricted actions.
- Protects sensitive routes such as creating, updating, or deleting products.

---

## **🛠️ Technologies Used**

| Technology       | Purpose                |
| ---------------- | ---------------------- |
| Node.js          | Runtime environment    |
| Express          | Backend framework      |
| Zod              | Input validation       |
| Multer           | Image upload           |
| CORS             | Origin access control  |
| FS / FS-Promises | JSON-based persistence |

---

## **📸 Image Upload**

Uploaded images are automatically stored inside `products_images/` and served statically through:

```
http://localhost:8080/products_images/<image_name>
```

---

## **🤝 Contributing**

Contributions are welcome!  
Fork the repository, create a new branch, and submit a pull request.

---
