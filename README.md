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
- 🌐 **Location-based listings** through APIs (e.g., Zillow, Realtor.ca)
- 🤖 **AI investment assessments** (cached for efficiency)
- 🔐 **User authentication** with JWT/session
- ⚡ **High-performance backend** using Django REST API and AWS
- 🐳 **Dockerized deployment** for easy setup
- 📋 **Extensible modular codebase** with API documentation

---

## Tech Stack
| Layer       | Technology                                                  |
|-------------|------------------------------------------------------------|
| **Frontend**    | [ReactJS](https://react.dev/) ([Vite](https://vitejs.dev/))|
| **Backend**     | [Django](https://www.djangoproject.com/)<br/>[Django REST Framework](https://www.django-rest-framework.org/) |
| **Cloud/DB**    | [AWS DynamoDB](https://aws.amazon.com/dynamodb/), [Amazon RDS](https://aws.amazon.com/rds/) |
| **DevOps**      | [Docker](https://www.docker.com/), [GitHub Actions](https://github.com/features/actions), [AWS](https://aws.amazon.com/) |
| **Source Ctrl** | [Git/GitHub](https://github.com/)                          |

---

## Architecture
```
ReactJS (Frontend)
      │
      ▼
Django REST API (Backend) ── External APIs (Zillow/Realtor.ca)
      │
      ▼
DynamoDB / Amazon RDS (Data storage)
      │
      ▼
AI API (e.g., OpenAI) for insights
```

---

## Project Structure
```
lyn-housing-ai-app/
├── backend/            # Django project & API
│   ├── lynapp-django/  # Main Django app
│   └── api/            # Example API
├── frontend/           
│   └── lynapp-react    # ReactJS app
├── docs/               # Developer & API documentation
├── infrastructure/     # Docker configs and scripts
├── tests/              # Unit & integration tests
├── .gitignore
├── LICENSE
└── README.md
```

---

## Getting Started
### 1. Clone the Repository
```bash
git clone https://github.com/ndmh99/lyn-housing-ai-app.git
cd lyn-housing-ai-app
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Activate on Windows
venv\Scripts\activate
# Or (Linux/MacOS/Git Bash)
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# API runs at http://127.0.0.1:8000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
# App runs at http://localhost:5173 (default Vite)
```

*Note: Ensure both backend and frontend servers are running.*

---

## API Endpoints
- `/api/listings/`  
  Planned for property search data
- `/api/listings/<id>/`  
  Planned for property details
- `/api/ai-assessment/`  
  On-demand AI property analysis

*Refer to [docs/](./docs/) for detailed API documentation.*

---

## Development
- Develop using `develop` and feature branches.
- Production-ready code in the `main` branch.
- Pull requests and code reviews are mandatory.
- *Docker Compose for local development experience coming soon.*

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

> *lyn-housing-ai-app: AI-powered property investment insights, built for speed, scale, and next-generation real estate.* 🏡✨