# Architecture Documentation

## System Overview

Lyn Housing AI follows a modern **full-stack architecture** with clear separation between frontend and backend services, integrated with external APIs for enhanced functionality.

## Architecture Diagram

```
Frontend (React 19.1.0 + Vite 6.3.5)
      │
      ├── Components (Reusable UI Components)
      │   ├── ListingCard, PropertySearchBox
      │   ├── PropertyMap (Leaflet + Geocoding)
      │   ├── PriceHistoryChart (Chart.js)
      │   ├── ScoreBadge (Walk Score API)
      │   ├── ImageGallery, RealtorInfo
      │   └── SimpleToast, FinancialMetrics
      │
      ├── Pages (Multi-Page Architecture)
      │   ├── HomePage, PropertiesPage
      │   ├── PropertyDetailPage (Individual Property)
      │   ├── AboutPage, LoginPage, RegisterPage
      │   └── Page-specific CSS Styling
      │
      ├── Hooks (Custom State Management)
      │   └── useListings (Property Data Management)
      │
      └── Services (API Integration Layer)
          └── Axios HTTP Client + API Configuration
      │
      ▼ (HTTP/REST API Communication)
      │
Django REST API Backend
      │
      ├── Listings App (Core Property API)
      │   ├── Models (Listing + PriceHistory)
      │   ├── Views (CRUD + Search + Price History)
      │   ├── Serializers (JSON Data Formatting)
      │   └── URLs (API Endpoint Routing)
      │
      ├── Management Commands
      │   └── Data Population Scripts
      │
      └── Django Configuration
          ├── CORS Headers (Frontend Integration)
          └── REST Framework Settings
      │
      ▼ (External API Integration)
      │
External Services
      │
      ├── OpenStreetMap Nominatim (Address → Coordinates)
      ├── Walk Score API (Walkability, Transit, Bike Scores)
      └── SQLite Database (Development Storage)
```

## Component Architecture

### Frontend Components

#### Core Components
- **ListingCard**: Displays property summary information in card format
- **PropertySearchBox**: Advanced search interface with city filtering
- **PropertyMap**: Interactive Leaflet map with automatic geocoding
- **PriceHistoryChart**: Chart.js visualization for price analytics

#### Specialized Components
- **ScoreBadge**: Walk Score API integration for walkability metrics
- **ImageGallery**: Property photo carousel with navigation
- **RealtorInfo**: Real estate agent profiles and contact information
- **SimpleToast**: User notification system

### Backend Architecture

#### Django Apps Structure
- **listings**: Core property management app
  - Models: `Listing` and `PriceHistory`
  - Views: RESTful API endpoints
  - Serializers: JSON data transformation
  - URLs: API routing configuration

#### Key Features
- **CORS Integration**: Seamless frontend-backend communication
- **Django REST Framework**: Standardized API responses
- **Management Commands**: Automated data population
- **SQLite Database**: Development-friendly storage

## Data Flow

### Property Search Flow
1. User enters search criteria in `PropertySearchBox`
2. Frontend calls `/api/listings/search/?city={city}`
3. Django filters listings based on city
4. Results displayed in `ListingCard` components

### Property Details Flow
1. User clicks on property from listings
2. Navigate to `PropertyDetailPage` with property ID
3. `useListings` hook fetches property details
4. Components render:
   - Property information and images
   - Interactive map with geocoded location
   - Price history chart
   - Walk Score integration

### External API Integration
- **Geocoding**: OpenStreetMap Nominatim converts addresses to coordinates
- **Walkability**: Walk Score provides mobility and transit ratings
- **No API keys required** for development setup

## Technology Decisions

### Frontend Stack
- **React 19**: Latest features and performance improvements
- **Vite**: Fast development server and optimized builds
- **React Router**: Client-side routing for multi-page experience
- **Axios**: HTTP client for API communication

### Backend Stack
- **Django**: Robust web framework with ORM
- **Django REST Framework**: API development toolkit
- **SQLite**: Simple development database

### External Libraries
- **Leaflet**: Open-source mapping library
- **Chart.js**: Flexible charting library
- **CSS Variables**: Maintainable styling system

## Scalability Considerations

### Performance Optimizations
- Component-based architecture for reusability
- Custom hooks for state management
- Efficient API design with minimal data transfer
- Optimized build process with Vite

### Future Enhancements
- PostgreSQL for production database
- Redis for caching
- Authentication and user management
- Advanced search filters
- Real-time property updates
