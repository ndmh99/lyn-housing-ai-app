# 🏡 Lyn Housing AI App 

## Overview
**Lyn Housing AI** is a **full-stack web platform** designed to provide AI-driven insights and assessments to home buyers and real estate professionals. 

- **Key Features:**
  - Aggregates real estate listings
  - Offers AI property evaluations
  - Integrates with modern cloud infrastructure

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
│       │   │   ├── HomePage.jsx
│       │   │   ├── AboutPage.jsx
│       │   │   └── PropertiesPage.jsx
│       │   ├── services/                         # API services
│       │   │   └── api.js                        # Axios API configuration
│       │   ├── hooks/                            # Custom React hooks
│       │   │   └── useListings.js
│       │   └── styles/                           # CSS stylesheets
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
- `/api/listings/`  
  Planned for property search data
- `/api/listings/<id>/`  
  Planned for property details

*Refer to [docs/](./docs/) for detailed API documentation.*

---

## Development
- Production-ready code in the `main` branch.
- Develop using `develop` and `test` branches.
- Frontend is deployed on Vercel, Backend on Render.

---

## Contributing
- Fork the repository and create a feature branch:
```bash
git checkout -b feature/YourFeature
```
- Commit your changes and push:
```bash
git push origin feature/YourFeature
```
- Open a Pull Request and describe your changes.
- *All contributors welcome! Guidelines in [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) (TBD).*

---

## License
[MIT License](./LICENSE) © [ndmh99](https://github.com/ndmh99)

---

> *lyn-housing-ai-app* 🏡✨ 2025