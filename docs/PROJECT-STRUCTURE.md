# Project Structure Documentation

## Overview
This document provides a detailed breakdown of the Lyn Housing AI App project structure, explaining the purpose and contents of each directory and major file.

## Root Directory Structure
```
lyn-housing-ai-app/
├── backend/                    # Django REST API backend with AI integration
├── frontend/                   # React frontend application  
├── docs/                      # Project documentation
├── docker-compose.yml         # Multi-service Docker orchestration
├── start-lynapp-win.bat      # Windows startup script
├── start-lynapp-macos.sh     # macOS/Linux startup script
├── LICENSE                   # MIT License
└── README.md                 # Project overview and setup guide
```

## Backend Structure (`backend/`)

### Django Project Layout
```
backend/
├── lynapp-django/            # Main Django project configuration
│   ├── __init__.py
│   ├── settings.py          # Django settings (CORS, REST framework, OpenAI)
│   ├── urls.py              # Main URL routing
│   ├── wsgi.py              # WSGI application entry point
│   └── asgi.py              # ASGI configuration (for async)
├── listings/                 # Main Django app for property API and AI analysis
│   ├── models.py            # Listing, PriceHistory, AnalysisCache models
│   ├── views.py             # API views (CRUD + search + AI analysis proxy)
│   ├── serializer.py        # Django REST Framework serializers
│   ├── urls.py              # API endpoint routing (including AI analysis)
│   ├── admin.py             # Django admin configuration
│   ├── apps.py              # App configuration
│   ├── tests.py             # Unit tests (to be implemented)
│   ├── migrations/          # Database migration files
│   ├── management/          # Custom management commands
│   │   ├── __init__.py
│   │   ├── commands/
│   │   │   ├── __init__.py
│   │   │   └── populate_listings.py  # Sample data population script
│   │   └── __pycache__/
│   └── __pycache__/         # Python bytecode cache
├── requirements.txt         # Python dependencies (Django, OpenAI, etc.)
├── manage.py               # Django management command interface
├── db.sqlite3              # SQLite database (development)
├── Dockerfile              # Docker container configuration
├── compose.yaml            # Docker Compose for backend service
└── .env                    # Environment variables (not in git)
```

### Key Backend Files

#### `models.py`
- **Listing Model**: Core property information (title, address, price, features)
- **PriceHistory Model**: Historical price data with JSON field for price progression
- **AnalysisCache Model**: Caches OpenAI analysis results for performance optimization

#### `views.py`
- RESTful API views using Django REST Framework
- CRUD operations for listings
- Search functionality with city filtering
- **OpenAIProxyAPIView**: AI-powered property analysis using OpenAI GPT-3.5-turbo
- Analysis caching system to reduce API costs and improve response times

#### `serializer.py`
- JSON serialization for API responses
- Data validation and formatting
- Nested serialization for related models (Listing with PriceHistory)

## Frontend Structure (`frontend/lynapp-react/`)

### React Application Layout
```
frontend/lynapp-react/
├── src/                     # Source code
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page-level components
│   ├── contexts/            # Global state management (Context API)
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API integration and external services
│   ├── tools/               # Utility functions and helper scripts
│   ├── styles/              # Global styles and design system
│   ├── assets/              # Static assets (images, fonts)
│   ├── App.jsx              # Main application component with routing
│   ├── App.css              # Main application styles
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global CSS resets and base styles
├── public/                  # Static assets served directly
│   ├── favicon.svg
│   ├── logo.png
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── thumbnail.png
│   └── vite.svg
├── package.json             # Node.js dependencies & scripts
├── vite.config.js           # Vite build configuration
├── eslint.config.js         # Code quality rules
├── index.html               # Main HTML template with SEO meta tags
├── README.md                # Frontend-specific documentation
├── Dockerfile               # Docker container configuration
├── compose.yaml             # Docker Compose for frontend service
└── .env                     # Environment variables (not in git)
```

### Components Directory (`src/components/`)
This directory contains all reusable React components, organized by functionality.
```
components/
├── buttons/                      # Action buttons for user interaction
│   ├── AiAnalysisButton.jsx      # AI-powered property analysis trigger
│   ├── FavoriteButton.jsx        # Property favoriting functionality
│   ├── RoiCalculatorButton.jsx   # ROI calculation tool
│   ├── ScheduleButton.jsx        # Viewing appointment scheduler
│   └── styles/                   # Component-specific styles
│       ├── AiAnalysisButton.css
│       ├── FavoriteButton.css
│       ├── RoiCalculatorButton.css
│       └── ScheduleButton.css
├── utility/                      # Small, general-purpose utility components
│   ├── SimpleToast.jsx           # Notification system
│   └── styles/
│       └── SimpleToast.css
├── ImageGallery.jsx              # Property image carousel
├── ListingCard.jsx               # Property summary card
├── PriceHistoryChart.jsx         # Chart.js price analytics and trends
├── PropertyMap.jsx               # Leaflet map integration with geocoding
├── PropertySearchBox.jsx         # Search interface with autocomplete
├── RealtorInfo.jsx               # Agent information display
├── ScoreBadge.jsx                # Walk Score, Transit Score, Bike Score display
└── styles/                       # Component-specific CSS files
    ├── ImageGallery.css
    ├── ListingCard.css
    ├── PriceHistoryChart.css
    ├── PropertyMap.css
    ├── PropertySearchBox.css
    ├── RealtorInfo.css
    └── ScoreBadge.css
```

### Pages Directory (`src/pages/`)
Contains top-level components that correspond to application routes, organized by user access level.
```
pages/
├── guest/                    # Pages accessible to all users
│   ├── HomePage.jsx          # Landing page with AI feature highlights
│   ├── PropertiesPage.jsx    # Property search and listing results
│   ├── PropertyDetailPage.jsx # Detailed property view with AI analysis
│   ├── AboutPage.jsx         # Company information and team details
│   └── styles/               # Page-specific styles
│       ├── HomePage.css
│       ├── PropertiesPage.css
│       ├── PropertyDetailPage.css
│       └── AboutPage.css
├── auth/                     # Authentication-related pages
│   ├── LoginPage.jsx         # Firebase authentication login
│   ├── RegisterPage.jsx      # User registration with validation
│   └── styles/               # Authentication page styles
│       ├── LoginPage.css
│       └── RegisterPage.css
└── user/                     # Pages for authenticated users
    ├── UserDashboardPage.jsx # User dashboard after login
    └── styles/
        └── UserDashboardPage.css
```

### Contexts Directory (`src/contexts/`)
Manages global state using React's Context API.
```
contexts/
└── AuthContext.jsx           # Manages Firebase user authentication state globally
```

### Services Directory (`src/services/`)
Handles all external API communication.
```
services/
├── api.js                    # Axios client for Django backend API communication
└── firebase.js               # Firebase configuration and authentication setup
```

### Tools Directory (`src/tools/`)
Contains helper functions and utilities that are not React components.
```
tools/
├── InputValidation.js        # Client-side form validation logic and rules
└── ScrollToTop.jsx           # Utility component to scroll to top on navigation
```

### Styles Directory (`src/styles/`)
Global styling and design system.
```
styles/
└── colors.css               # Design system color variables and theme
```

### Assets Directory (`src/assets/`)
Static assets for the application.
```
assets/
├── images/                  # Property images and UI graphics
├── icons/                   # SVG icons and custom graphics
└── fonts/                   # Custom fonts (if any)
```

### Hooks Directory (`src/hooks/`)
```
hooks/
└── useListings.js           # Custom hook for property data management
```

#### useListings Hook
- Manages fetching and state for property data from Django API
- Handles both city search and individual property retrieval
- Provides loading states and error handling for better UX
- Optimized with dependency arrays for performance
- Supports both localhost (development) and production API endpoints

## Documentation Structure (`docs/`)
```
docs/
├── API.md                   # API endpoint documentation
├── ARCHITECTURE.md          # System architecture guide
├── DEVELOPMENT.md           # Development workflow and guidelines
├── INSTALLATION.md          # Detailed setup instructions
├── CONTRIBUTING.md          # Contribution guidelines
└── PROJECT-STRUCTURE.md     # This file
```

## Configuration Files

### Frontend Configuration
- **package.json**: Dependencies, scripts, and project metadata
- **vite.config.js**: Build tool configuration and development server settings
- **eslint.config.js**: Code quality and linting rules for React
- **index.html**: Main HTML template with SEO meta tags and structured data
- **.env**: Environment variables for Firebase and API configuration

### Backend Configuration
- **requirements.txt**: Python package dependencies (Django, OpenAI, CORS, etc.)
- **settings.py**: Django configuration (database, CORS, OpenAI API, environment variables)
- **manage.py**: Django command-line utility for migrations and server management
- **.env**: Environment variables for OpenAI API key and Django settings

### Docker Configuration
- **docker-compose.yml**: Multi-service orchestration for development
- **backend/Dockerfile**: Backend container configuration
- **frontend/lynapp-react/Dockerfile**: Frontend container configuration
- **backend/compose.yaml**: Backend-specific Docker Compose
- **frontend/lynapp-react/compose.yaml**: Frontend-specific Docker Compose

## Static Assets

### Frontend Assets (`public/` and `src/assets/`)
- **Logo and branding**: Application logo, favicon, and brand assets
- **Images**: Property photos, hero images, and UI graphics
- **Icons**: SVG icons for interface elements and social media
- **SEO Assets**: Thumbnails, robots.txt, sitemap.xml for search optimization

## Startup Scripts
- **start-lynapp-win.bat**: Automated Windows setup and launch
- **start-lynapp-macos.sh**: macOS/Linux setup and launch script

These scripts handle:
- Virtual environment setup and activation
- Dependency installation (pip and npm)
- Database migrations and setup
- Environment variable configuration
- Concurrent frontend and backend startup

## File Naming Conventions

### Frontend
- **Components**: PascalCase with matching CSS files (`ListingCard.jsx` + `ListingCard.css`)
- **Pages**: PascalCase with `Page` suffix (`HomePage.jsx`)
- **Hooks**: camelCase with `use` prefix (`useListings.js`)
- **Services**: camelCase (`api.js`)

### Backend
- **Models**: PascalCase class names (`Listing`, `PriceHistory`, `AnalysisCache`)
- **Views**: snake_case function names (`search_listings`) and PascalCase class names (`OpenAIProxyAPIView`)
- **URLs**: kebab-case patterns (`/api/listings/analyze-housing/`)
- **Files**: snake_case Django convention (`models.py`, `views.py`, `serializer.py`)
