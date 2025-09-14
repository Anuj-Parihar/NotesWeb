 Multi-Tenant SaaS Notes Application

A **multi-tenant SaaS Notes Application** built with **Express.js, MongoDB, JWT, Vite + React, and Tailwind CSS**, supporting:

* 🔐 Multi-tenant authentication (JWT-based)
* 👥 Role-based access (Admin / Member)
* 📑 Notes management (CRUD)
* 💳 Subscription plans (`Free` – max 3 notes, `Pro` – unlimited)
* 🌍 Deployment-ready on **Vercel**

---

## 🚀 Tech Stack

### Backend

* **Node.js + Express.js**
* **MongoDB + Mongoose**
* **JWT Authentication**
* **bcryptjs** for password hashing
* **Helmet, CORS** for security

### Frontend

* **React.js (Vite)**
* **Tailwind CSS** for styling
* **Axios** for API calls
* **React Router** for navigation

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Anuj-Parihar/NotesWeb.git
cd notes-saas
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/notesApp
JWT_SECRET=super-secret-key
JWT_EXPIRES_IN=7d
```

Run seed script (to create tenants & users):

```bash
node seed/seed.js
```

Start backend:

```bash
npm run dev   # using nodemon
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Start frontend:

```bash
npm run dev
```

---

## 🌍 API Endpoints

### Authentication

| Method | Endpoint       | Description                                          |
| ------ | -------------- | ---------------------------------------------------- |
| POST   | `/auth/login`  | Login with email & password (returns JWT)            |
| POST   | `/auth/invite` | (Admin only) Invite a new user with default password |

**Example Login Request:**

```json
POST /auth/login
{
  "email": "admin@acme.test",
  "password": "password"
}
```

**Response:**

```json
{
  "token": "jwt-token-here",
  "user": {
    "email": "admin@acme.test",
    "role": "Admin",
    "tenant": "acme"
  }
}
```

---

### Notes

| Method | Endpoint     | Description                       |
| ------ | ------------ | --------------------------------- |
| GET    | `/notes`     | List all notes for current tenant |
| POST   | `/notes`     | Create a new note                 |
| GET    | `/notes/:id` | Get a note by ID                  |
| PUT    | `/notes/:id` | Update note by ID                 |
| DELETE | `/notes/:id` | Delete note by ID                 |

**Free Plan Limitation:** Max 3 notes per tenant.

---

### Tenants

| Method | Endpoint                 | Description                                          |
| ------ | ------------------------ | ---------------------------------------------------- |
| POST   | `/tenants/:slug/upgrade` | Upgrade a tenant’s plan from free → pro (Admin only) |

---

## 🖥️ Frontend Features

* 🔐 **Login Page**: Enter email + password
* 📑 **Notes Dashboard**: List, create, edit, delete notes
* 🚫 **Free Plan Limit Banner**: Shows **“Upgrade to Pro”** if free tenant reaches 3 notes
* ⚙️ **Upgrade Flow**: Calls `/tenants/:slug/upgrade`

---

## 👤 Default Test Accounts (Seeded Users)

| Email                                         | Password | Role   | Tenant |
| --------------------------------------------- | -------- | ------ | ------ |
| [admin@acme.test](mailto:admin@acme.test)     | password | Admin  | Acme   |
| [user@acme.test](mailto:user@acme.test)       | password | Member | Acme   |
| [admin@globex.test](mailto:admin@globex.test) | password | Admin  | Globex |
| [user@globex.test](mailto:user@globex.test)   | password | Member | Globex |

---

## 🧪 Testing

### Run Backend API Tests (manual with curl / Postman)

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@acme.test","password":"password"}'

# Create a note (using token)
curl -X POST http://localhost:3000/notes \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"First Note","content":"Hello world"}'
```

### Run Frontend

* Visit [http://localhost:5173](http://localhost:5173)
* Login with any seeded account
* Test notes CRUD and tenant upgrade

---

---> Project Structure
backend/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── seed/
 ├── utils/
 ├── server.js
 └── .env

frontend/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── services/
 │   ├── App.jsx
 │   └── main.jsx
 ├── .env
 └── vite.config.js


