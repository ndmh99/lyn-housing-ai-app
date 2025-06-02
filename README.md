# 🏡 Lyn Housing AI App 

## Overview
**Lyn Housing AI** is a **full-stack web platform** designed to provide AI-driven insights and assessments to home buyers and real estate professionals.

<p align="center">
  <img src="https://raw.githubusercontent.com/github/explore/main/topics/react/react.png" alt="React" width="48" height="48"/>
  <img src="https://www.svgrepo.com/show/353657/django-icon.svg" alt="Django" width="48" height="48"/>
  <img src="https://vitejs.dev/logo.svg" alt="Vite" width="48" height="48"/>
  <img src="https://raw.githubusercontent.com/github/explore/main/topics/postgresql/postgresql.png" alt="PostgreSQL" width="48" height="48"/>
  <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" alt="Vercel" width="48" height="48"/>
  <img src="https://us1.discourse-cdn.com/flex016/uploads/render/original/2X/1/11352202c8503f736bea5efb59684f678d7c860c.svg" alt="Render" width="48" height="48"/>
  <img src="https://static-00.iconduck.com/assets.00/docker-icon-1024x876-69aqwp3k.png" alt="Render" width="48"/>
</p>

---

## Table of Contents
- 📍 [Features](#features)
- 💻 [Tech Stack](#tech-stack)
- 🏗️ [Architecture](#architecture)
- 📂 [Project Structure](#project-structure)
- ⚙️ [Getting Started](#getting-started)
- 🛠️ [API Endpoints](#api-endpoints)
- 🔧 [Development](#development)
- 🤝 [Contributing](#contributing)
- 📜 [License](#license)

---

## Features
- 🌐 **Location-based listings** through APIs (e.g., Zillow, Realtor.ca, local server, etc.)
- 🤖 **AI investment assessments** (cached for efficiency)
- 🔐 **User authentication** with JWT/session
- ⚡ **High-performance backend** using Django REST API and AWS Database solution.
- 🐳 **Dockerized deployment** for easy setup
- 📋 **Extensible modular codebase** with API documentation

---

## Tech Stack
| Layer       | Technology                                                  |
|-------------|------------------------------------------------------------|
| **Frontend**    | [ReactJS](https://react.dev/) ([Vite](https://vitejs.dev/))|
| **Backend**     | [Django](https://www.djangoproject.com/)  ([REST Framework](https://www.django-rest-framework.org/))|
| **Cloud/DB**    | [Amazon RDS](https://aws.amazon.com/rds/) |
| **Container**      | [Docker](https://www.docker.com/)|
| **Source Ctrl** | [Git/GitHub](https://github.com/)|
| **Deployment**    | [Vercel](https://vercel.com/) (FE)<br>[Render](https://render.com/) (BE) |
---

## Architecture
```
ReactJS (Frontend)
      │
      ▼
Django REST API (Backend) ── External APIs ── Zillow/Realtor.ca
      │
      ▼
Amazon RDS (Data storage)
      │
      ▼
AI API (e.g., OpenAI) for insights (On Development)
```

---

## Project Structure
```
lyn-housing-ai-app/
├── backend/                                      # Django REST API backend
│   ├── listings/                                 # Django app for property listings API
│   ├── lynapp-django/                            # Main Django application
│   ├── requirements.txt                          # Python dependencies
│   └── manage.py                                 # Django management script
├── frontend/                                     # React frontend application
│   └── lynapp-react/                             # ReactJS app (Vite)
│       ├── src/                                  # Source code
│       │   ├── components/                       # Reusable UI components
│       │   │   ├── ListingCard.jsx
│       │   │   └── PropertySearchBox.jsx
│       │   ├── pages/                            # Page components
│       │   │   ├── styles/                       # Page-specific styles
│       │   │   ├── HomePage.jsx
│       │   │   ├── AboutPage.jsx
│       │   │   └── PropertiesPage.jsx
│       │   ├── services/                         # API services
│       │   │   └── api.js                        # Axios API configuration
│       │   └── hooks/                            # Custom React hooks
│       │       └── useListings.js
│       ├── package.json                          # Node.js dependencies
│       └── index.html                            # Main HTML template
├── docs/                                         # Documentation
│   ├── INSTALLATION.md                           # Setup instructions
│   └── CONTRIBUTING.md                           # Contribution guidelines
├── LICENSE                                       # MIT License
└── README.md                                     # README file
```

---

## Getting Started

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/ndmh99/lyn-housing-ai-app.git
cd lyn-housing-ai-app

# 2. Setup backend (Django)
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# 3. Setup frontend (React) - Open new terminal
cd frontend/lynapp-react
npm install
npm run dev
```

**Prerequisites:** Python 3.8+, Node.js 16+

📖 **New to development?** Check our [detailed installation guide](./docs/INSTALLATION.md) for step-by-step instructions for Windows, macOS, and Linux.

**Access the app:**
- Frontend: http://localhost:5173
- Backend API: http://127.0.0.1:8000

---

## API Endpoints
*Refer to [docs/](./docs/) for detailed API documentation.*

---

## Development
- Production-ready code in the `main` branch.
- Develop using `develop` and `test` branches.
- Cloud deployment via `deployment` branch.

---

## Contributing
- Open a Pull Request and describe your changes.
- *All contributors welcome! Guidelines in [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) (TBD).*

---

## License
[MIT License](./LICENSE) © [ndmh99](https://github.com/ndmh99)

---

> *lyn-housing-ai-app* 🏡✨ 2025
