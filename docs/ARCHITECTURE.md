# Architecture Documentation

## System Overview

Lyn Housing AI follows a modern **full-stack architecture** with clear separation between frontend and backend services, integrated with external APIs for enhanced functionality. This document outlines the key components, data flows, and technology choices that power the application.

## Architecture Diagram

```
Frontend (React 19 + Vite)
      │
      ├── Components (Reusable UI Components)
      │   ├── Core: ListingCard, PropertySearchBox
      │   ├── Details: PropertyMap, PriceHistoryChart, ImageGallery
      │   ├── Buttons: FavoriteButton, ScheduleButton, etc.
      │   ├── UI: ScoreBadge, RealtorInfo, SimpleToast
      │
      ├── Pages (Router-based Page Views)
      │   ├── Guest: HomePage, PropertiesPage, PropertyDetailPage
      │   ├── Auth: LoginPage, RegisterPage
      │   └── User: UserDashboardPage
      │
      ├── Contexts (Global State Management)
      │   └── AuthContext (Firebase User State)
      │
      ├── Hooks (Custom Logic)
      │   └── useListings (Property Data Fetching)
      │
      ├── Services (API Connectors)
      │   ├── api.js (Django Backend API)
      │   ├── firebase.js (Authentication)
      │
      ├── Tools (Utilities)
      │   ├── InputValidation.js
      │   └── ScrollToTop.js
      │
      ▼ (HTTP/REST API Communication)
      │
Django REST API Backend
      │
      ├── Listings App (Core Property API)
      │   ├── Models (Listing, PriceHistory)
      │   ├── Views (CRUD, Search, Price History)
      │   ├── Serializers (JSON Data Formatting)
      │   └── URLs (API Endpoint Routing)
      │
      └── Django Configuration
          ├── CORS Headers, REST Framework
          └── Management Commands (Data Population)
      │
      ▼ (Database & External Services)
      │
Databases & External Services
      │
      ├── SQLite (Development Database)
      ├── Firebase Authentication (User Management)
      ├── OpenStreetMap Nominatim (Geocoding)
      └── Walk Score API (Walkability, Transit Scores)
```

## Component Architecture

### Frontend Components

Our frontend is built with a modular, component-based architecture to promote reusability and maintainability.

#### Core Components
- **ListingCard**: A summary card for a single property, used on the `PropertiesPage`.
- **PropertySearchBox**: A form for searching properties by city.
- **PropertyMap**: An interactive Leaflet map that displays a property's location using geocoding.
- **PriceHistoryChart**: A Chart.js graph visualizing the price history of a property.

#### UI & Utility Components
- **ScoreBadge**: Displays Walk Score, Transit Score, and Bike Score.
- **ImageGallery**: A carousel for viewing property images.
- **RealtorInfo**: Shows contact information for the listing agent.
- **SimpleToast**: A non-blocking notification pop-up for user feedback.
- **Action Buttons**: A suite of buttons (`FavoriteButton`, `ScheduleButton`, `RoiCalculatorButton`, `AiAnalysisButton`) for user interactions on the `PropertyDetailPage`.

### Backend Architecture

The backend is a monolithic Django application that exposes a RESTful API.

#### Django Apps Structure
- **listings**: The core application managing all property-related data.
  - **Models**: `Listing` and `PriceHistory` define the database schema.
  - **Views**: API endpoints for creating, retrieving, updating, and deleting listings. Includes search functionality.
  - **Serializers**: Manages the conversion of complex data types (like Django models) to JSON.
  - **URLs**: Defines the API endpoint routes.

## Data Flow

### Property Search & View Flow
1.  A user on the `PropertiesPage` uses the `PropertySearchBox`.
2.  The frontend makes a GET request to the `/api/listings/search/?city={city}` endpoint.
3.  The Django backend filters listings by city and returns the data.
4.  The results are displayed as a series of `ListingCard` components.
5.  Clicking a card navigates the user to the `PropertyDetailPage`, passing the property ID in the URL. The previous search page number is preserved in the URL (`?page=2`) for improved navigation.
6.  The `PropertyDetailPage` fetches detailed data for that property and renders components like `ImageGallery`, `PropertyMap`, and `PriceHistoryChart`.

### User Authentication Flow
1.  A new user navigates to the `RegisterPage` and fills out the registration form.
2.  Client-side validation is performed instantly using the `InputValidation` tool.
3.  Upon submission, a request is sent to Firebase Authentication to create a new user.
4.  Once registered, the user's authentication state is managed globally by `AuthContext`.
5.  Authenticated users can log in via the `LoginPage`.
6.  The main navigation bar dynamically changes based on the user's auth state, showing either login/register links or a user dashboard/logout menu.
7.  Protected actions, like favoriting a property, now check the `AuthContext` and prompt unauthenticated users to log in.

## Technology Decisions

### Frontend Stack
- **React 19**: A modern JavaScript library for building user interfaces.
- **Vite**: A next-generation frontend tooling for fast development and optimized builds.
- **React Router**: For client-side routing in a multi-page application.
- **Axios**: A promise-based HTTP client for communicating with the backend API.
- **Firebase Authentication**: For user registration, login, and session management.

### Backend Stack
- **Django**: A high-level Python web framework.
- **Django REST Framework**: A powerful toolkit for building Web APIs.
- **SQLite**: A lightweight, serverless database ideal for development.

### External Libraries & Services
- **Leaflet**: An open-source library for interactive maps.
- **Chart.js**: A flexible library for creating charts and graphs.
- **Font Awesome**: Used for social media and action icons.

## Scalability and Future Enhancements

### Implemented Features
- **Component-based architecture** for high reusability.
- **Global state management** with React Context for authentication.
- **Client-side routing** for a seamless single-page application experience.
- **User authentication and management** via Firebase.
- **Efficient API design** with Django REST Framework.

### Future Roadmap
- **Database Migration**: Transition from SQLite to a production-grade database like PostgreSQL.
- **Caching**: Implement Redis for caching frequent API responses to improve performance.
- **Advanced Search**: Add more complex search filters (e.g., price range, number of bedrooms).
- **Real-time Updates**: Use WebSockets for real-time property notifications.
- **Containerization**: Dockerize the frontend and backend for consistent deployment environments.
