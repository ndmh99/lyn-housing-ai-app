# Development Guide

## Development Workflow

### Git Workflow
- **main**: Production-ready stable code
- **develop**: Active development and feature integration  
- **feature/***: Individual feature development branches
- **test**: Quality assurance and testing environment

### Branch Strategy
```bash
# Create a new feature branch
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Work on your feature, then merge back
git checkout develop
git merge feature/your-feature-name
```

## Available Scripts

### Frontend (React + Vite)
```bash
npm run dev          # Development server with hot reload
npm run build        # Production build
npm run preview      # Preview production build locally
npm run lint         # ESLint code quality check
```

### Backend (Django)
```bash
python manage.py runserver              # Development server
python manage.py migrate               # Apply database migrations
python manage.py makemigrations        # Create new migrations
python manage.py populate_listings     # Load sample data
python manage.py collectstatic         # Collect static files (production)
python manage.py createsuperuser       # Create admin user
python manage.py test                  # Run tests
```

### Docker (Optional)
```bash
# Build and run all services
docker-compose up --build

# Run backend only
cd backend && docker-compose up

# Run frontend only
cd frontend/lynapp-react && docker-compose up
```

## Development Environment Setup

### Development URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://127.0.0.1:8000/api
- **Django Admin**: http://127.0.0.1:8000/admin

### Environment Configuration
Create a `.env` file in the backend directory:
```env
DEBUG=True
SECRET_KEY_NAME=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key-here
```

Create a `.env` file in the frontend/lynapp-react directory:
```env
VITE_FIREBASE_API_KEY=your-firebase-api-key

```

## Code Quality Guidelines

### Frontend Standards
- **ESLint**: Configured with React hooks and refresh rules
- **Component Structure**: One component per file
- **CSS Organization**: Component-specific CSS files
- **State Management**: Use custom hooks when appropriate

### Backend Standards
- **Django Best Practices**: Follow Django coding style
- **API Design**: RESTful endpoints with proper HTTP methods
- **Error Handling**: Consistent error responses
- **Documentation**: Docstrings for all functions and classes

## Key Development Features

### Hot Reload
- **Frontend**: Vite provides instant hot module replacement
- **Backend**: Django development server auto-reloads on file changes

### CORS Configuration
- Pre-configured for frontend-backend communication
- Allows requests from http://localhost:5173

### Database Management
- **Migrations**: Automatic schema management
- **Admin Interface**: Django admin for data management
- **Sample Data**: Population script for development

## Testing Strategy

### Frontend Testing (Planned)
- Unit tests with React Testing Library
- Component integration tests
- E2E tests with Playwright

### Backend Testing (Planned)
- Django test framework
- API endpoint testing
- Model and serializer tests

## Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Vite handles automatic code splitting
- **Component Lazy Loading**: Load components on demand
- **Image Optimization**: Optimize property images
- **Bundle Analysis**: Analyze build output for optimization

### Backend Optimizations
- **Database Queries**: Optimize Django ORM queries
- **AI Analysis Caching**: AnalysisCache model reduces OpenAI API calls
- **API Response**: Minimize data transfer with efficient serializers

## Debugging

### Frontend Debugging
- **React DevTools**: Browser extension for component debugging
- **Vite DevTools**: Built-in development tools
- **Console Logging**: Strategic console.log placement

### Backend Debugging
- **Django Debug Toolbar**: Development debugging interface
- **Logging**: Python logging for API requests
- **Database Queries**: Monitor and optimize queries

## External API Integration

### OpenAI API
- **API Key**: Required in backend .env file for AI analysis features
- **Rate Limiting**: Implemented caching to minimize API calls
- **Error Handling**: Graceful fallback when AI analysis fails

### Firebase Authentication
- **Configuration**: Required in frontend .env file
- **Error Handling**: User-friendly authentication error messages
- **Session Management**: Automatic token refresh and logout

### Leaflet Maps
- **OpenStreetMap**: Free geocoding and mapping service
- **Rate Limiting**: Respect API rate limits
- **Error Handling**: Graceful fallback for geocoding failures

### Walk Score API
- **Image Loading**: Handle image loading errors gracefully
- **Fallback Content**: Show default content if API unavailable

## Common Development Tasks

### Adding a New Component
1. Create component file in `src/components/`
2. Create corresponding CSS file
3. Export component from component file
4. Import and use in parent components

### Adding a New API Endpoint
1. Define view function in `listings/views.py`
2. Create URL pattern in `listings/urls.py`
3. Add serializer if needed in `listings/serializer.py`
4. Update CORS settings if needed
5. Test endpoint in browser or API client

### Working with AI Features
1. Ensure OpenAI API key is set in backend .env
2. Check AnalysisCache model for existing analysis
3. Use OpenAIProxyAPIView for new AI integrations
4. Handle API errors gracefully with try/catch blocks

### Database Schema Changes
1. Modify models in `listings/models.py`
2. Create migration: `python manage.py makemigrations`
3. Apply migration: `python manage.py migrate`
4. Update admin interface if needed
5. Update serializers if model fields changed

## Troubleshooting

### Common Issues
- **CORS Errors**: Check CORS_ALLOWED_ORIGINS in Django settings
- **Port Conflicts**: Ensure ports 5173 and 8000 are available
- **Database Locks**: Delete db.sqlite3 and re-migrate if needed
- **Node Modules**: Delete node_modules and reinstall if dependency issues
- **OpenAI API Errors**: Verify API key is set correctly in backend .env
- **Firebase Auth Errors**: Check Firebase configuration in frontend .env
- **AI Analysis 401 Errors**: Usually indicates incorrect or expired OpenAI API key

### Environment Issues
- **Python Virtual Environment**: Ensure virtual environment is activated
- **Node Version**: Verify Node.js version compatibility (16+)
- **Python Version**: Verify Python version compatibility (3.8+)
- **Environment Variables**: Check .env files are not committed to git
- **API Keys**: Ensure all required API keys are configured
