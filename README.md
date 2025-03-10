# Package Tracking System with User Authentication

A full-stack web application that enables users to track packages and manage shipments with secure authentication. The system provides comprehensive package management features with real-time status updates and email-based password recovery.

The application is built using Django REST Framework for the backend API and Next.js for the frontend interface. It implements JWT-based authentication for secure user sessions and includes features such as user registration, login, password reset, and package management. The system allows users to create, track, and manage packages while maintaining sender and receiver information with email-based identification.

## Repository Structure

```
.
├── backend/                      # Django backend application
│   ├── account/                 # User authentication and management
│   │   ├── models/             # User model definitions
│   │   ├── serializers.py      # API data serialization
│   │   └── views/              # Authentication view controllers
│   ├── packages/               # Package management functionality
│   │   ├── models/            # Package model definitions
│   │   └── views/             # Package CRUD operations
│   └── core/                   # Core application functionality
│       └── models/            # Base model classes
├── frontend/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/               # Next.js application routes
│   │   ├── components/        # Reusable React components
│   │   └── utils/             # Utility functions and API client
│   └── package.json           # Frontend dependencies and scripts
```

## Usage Instructions

### Prerequisites

- Python 3.8 or higher
- Node.js 14.x or higher
- npm or yarn package manager
- PostgreSQL (optional, SQLite by default)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

2. Set up the backend:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser

Note: http://127.0.0.1:8000 If you don't have this port(8000), you can simply click ctrl + shift + F and search for this Base Url and change it with your port(xxxx).
```

3. Set up the frontend:

```bash
cd frontend
npm install
```

### Quick Start

1. Start the backend server:

```bash
cd backend
python manage.py runserver 8007
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

3. Access the application at `http://localhost:3000`

### More Detailed Examples

1. User Registration:

```javascript
// POST /api/user/register/
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword",
  "password2": "securepassword",
  "tc": true
}
```

2. Package Creation:

```javascript
// POST /api/packages/
{
  "name": "Package Name",
  "description": "Package Description",
  "receiver": "receiver@example.com",
  "sender": "sender@example.com",
  "status": "PENDING"
}
```

### Troubleshooting

1. JWT Token Issues

- Problem: "Token is not Valid or Expired"
- Solution:

```javascript
// Clear local storage and re-login
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");
```

2. Database Migration Issues

- Problem: "Table already exists"
- Solution:

```bash
python manage.py migrate --fake
python manage.py migrate --run-syncdb
```

3. CORS Issues

- Problem: API requests blocked by CORS
- Solution: Verify CORS settings in `backend/settings.py`:

```python
CORS_ALLOW_ALL_ORIGINS = True  # Development only
```

## Data Flow

The application follows a standard client-server architecture with RESTful API communication between the frontend and backend.

```ascii
+-------------+     HTTP/REST     +-------------+     SQL      +-------------+
|             |  JWT Auth Token   |             |             |             |
|  Frontend   |<----------------->|   Backend   |<----------->|  Database   |
| (Next.js)   |    JSON Data     |   (Django)  |             |  (SQLite)   |
|             |                   |             |             |             |
+-------------+                   +-------------+             +-------------+
```

Key component interactions:

1. Frontend makes authenticated API requests using JWT tokens
2. Backend validates tokens and processes requests
3. Package data is stored and retrieved from the database
4. Email notifications are sent for password reset requests
5. Real-time status updates are processed through the API
6. User sessions are managed using JWT refresh tokens
7. Form data is validated on both client and server sides
