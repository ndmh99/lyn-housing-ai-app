# Project Structure Documentation

## Overview
This document provides a detailed breakdown of the Lyn Housing AI App project structure, explaining the purpose and contents of each directory and major file.

## Root Directory Structure
```
lyn-housing-ai-app/
├── backend/                    # Django REST API backend
├── frontend/                   # React frontend application  
├── docs/                      # Project documentation
├── infrastructure/            # Deployment configurations
├── tests/                     # Test suites (planned)
├── start-lynapp-win.bat      # Windows startup script
├── start-lynapp-macos.sh     # macOS/Linux startup script
├── LICENSE                   # MIT License
└── README.md                 # Project overview
```

## Backend Structure (`backend/`)

### Django Project Layout
```
backend/
├── lynapp-django/            # Main Django project configuration
│   ├── __init__.py
│   ├── settings.py          # Django settings (CORS, REST framework)
│   ├── urls.py              # Main URL routing
│   ├── wsgi.py              # WSGI application entry point
│   └── asgi.py              # ASGI configuration (for async)
├── listings/                 # Main Django app for property API
│   ├── models.py            # Listing & PriceHistory models
│   ├── views.py             # API views (CRUD + search + price history)
│   ├── serializer.py        # Django REST Framework serializers
│   ├── urls.py              # API endpoint routing
│   ├── admin.py             # Django admin configuration
│   ├── apps.py              # App configuration
│   ├── tests.py             # Unit tests (to be implemented)
│   ├── migrations/          # Database migration files
│   │   ├── __init__.py
│   │   ├── 0001_initial.py
│   │   └── ...
│   └── management/commands/ # Custom management commands
│       └── populate_listings.py  # Sample data population script
├── requirements.txt         # Python dependencies
├── manage.py               # Django management command interface
└── db.sqlite3              # SQLite database (development)
```

### Key Backend Files

#### `models.py`
- **Listing Model**: Core property information (title, address, price, features)
- **PriceHistory Model**: Historical price data with JSON field for price progression

#### `views.py`
- RESTful API views using Django REST Framework
- CRUD operations for listings
- Search functionality with city filtering
- Price history endpoint

#### `serializer.py`
- JSON serialization for API responses
- Data validation and formatting
- Nested serialization for related models

## Frontend Structure (`frontend/lynapp-react/`)

### React Application Layout
```
frontend/lynapp-react/
├── src/                     # Source code
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page-level components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API integration
│   ├── styles/             # Global styles
│   ├── assets/             # Static assets
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Application entry point
├── public/                 # Static public assets
├── package.json           # Node.js dependencies & scripts
├── vite.config.js         # Vite build configuration
├── eslint.config.js       # Code quality rules
└── index.html             # HTML template
```

### Components Directory (`src/components/`)
```
components/
├── ListingCard.jsx + .css        # Property listing card
├── PropertySearchBox.jsx + .css  # Search interface
├── PropertyMap.jsx + .css        # Leaflet map integration
├── PriceHistoryChart.jsx + .css  # Chart.js price analytics
├── ScoreBadge.jsx + .css         # Walk Score integration
├── ImageGallery.jsx + .css       # Property image carousel
├── RealtorInfo.jsx + .css        # Agent information display
├── SimpleToast.jsx + .css        # Notification system
└── FinancialMetrics.jsx + .css   # Investment calculations
```

#### Component Purposes
- **ListingCard**: Displays property summary in card format
- **PropertySearchBox**: Advanced search with filtering capabilities
- **PropertyMap**: Interactive map with geocoding integration
- **PriceHistoryChart**: Visual price analytics with trend lines
- **ScoreBadge**: Walkability and transit score display
- **ImageGallery**: Property photo carousel with navigation
- **RealtorInfo**: Agent profiles and contact information
- **SimpleToast**: User-friendly notification system
- **FinancialMetrics**: Investment analysis tools

### Pages Directory (`src/pages/`)
```
pages/
├── HomePage.jsx              # Landing page with featured properties
├── PropertiesPage.jsx        # Property listings with search/filter
├── PropertyDetailPage.jsx    # Individual property details
├── AboutPage.jsx             # Company information
├── LoginPage.jsx             # User authentication
├── RegisterPage.jsx          # User registration
└── styles/                   # Page-specific CSS files
```

### Services Directory (`src/services/`)
```
services/
└── api.js                    # Axios HTTP client and API configuration
```

#### API Service Functions
- `getListings()`: Fetch all properties
- `searchListings(city)`: Search properties by city
- `getListingById(id)`: Get specific property details
- `listingsAPI`: Object with CRUD operations

### Hooks Directory (`src/hooks/`)
```
hooks/
└── useListings.js           # Custom hook for property data management
```

#### useListings Hook
- Manages property data fetching and state
- Handles both city search and individual property retrieval
- Provides loading states and error handling
- Optimized with dependency arrays for performance

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
- **vite.config.js**: Build tool configuration
- **eslint.config.js**: Code quality and linting rules
- **index.html**: Main HTML template

### Backend Configuration
- **requirements.txt**: Python package dependencies
- **settings.py**: Django configuration (database, CORS, etc.)
- **manage.py**: Django command-line utility

## Static Assets

### Frontend Assets (`public/` and `src/assets/`)
- **Logo and branding**: Application logo and favicon
- **Images**: Property photos and UI assets
- **Icons**: SVG icons for interface elements

## Startup Scripts
- **start-lynapp-win.bat**: Automated Windows setup and launch
- **start-lynapp-macos.sh**: macOS/Linux setup and launch script

These scripts handle:
- Virtual environment setup
- Dependency installation
- Database migrations
- Concurrent frontend and backend startup

## File Naming Conventions

### Frontend
- **Components**: PascalCase with matching CSS files (`ListingCard.jsx` + `ListingCard.css`)
- **Pages**: PascalCase with `Page` suffix (`HomePage.jsx`)
- **Hooks**: camelCase with `use` prefix (`useListings.js`)
- **Services**: camelCase (`api.js`)

### Backend
- **Models**: PascalCase class names (`Listing`, `PriceHistory`)
- **Views**: snake_case function names (`search_listings`)
- **URLs**: kebab-case patterns (`/api/listings/search/`)
- **Files**: snake_case Django convention (`models.py`, `views.py`)
