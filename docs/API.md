# API Documentation

## Core Listings API

### Endpoints Overview
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/listings/` | Get all property listings |
| `GET` | `/api/listings/{id}/` | Get specific property details with price history |
| `GET` | `/api/listings/search/?city={city}` | Search properties by city (case-insensitive) |
| `POST` | `/api/listings/create/` | Create new property listing |
| `PUT` | `/api/listings/{id}/update/` | Update existing property |
| `DELETE` | `/api/listings/{id}/delete/` | Delete property listing |

## AI Analysis API

### AI Property Analysis
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/listings/analyze-housing/` | Generate AI-powered property analysis using OpenAI |

**Request Body:**
```json
{
  "listing_id": 1
}
```

**Features:**
- Intelligent caching system for performance optimization
- Comprehensive market analysis using OpenAI GPT-3.5-turbo
- Structured analysis with market trends and price predictions
- Error handling with detailed feedback

## Sample API Responses

### Get Property Details
**Request:** `GET /api/listings/1/`

**Response:**
```json
{
  "id": 1,
  "title": "Beautiful Family Home",
  "street_address": "123 Main St",
  "city": "Vancouver",
  "province": "BC",
  "current_price": 750000.00,
  "bedrooms": 3,
  "bathrooms": 2,
  "square_feet": 1800,
  "description": "Lovely family home with spacious backyard...",
  "image_url": "https://example.com/image.jpg",
  "price_histories": [
    {
      "id": 1,
      "price_values": "[{\"date\": \"2024-01-22\", \"price\": 750000.0}, {\"date\": \"2024-06-15\", \"price\": 780000.0}]",
      "date_recorded": "2024-06-15"
    }
  ]
}
```

### Get Price History
**Note:** Price history is included in the property details endpoint. There is no separate price history endpoint.

**Access via:** `GET /api/listings/{id}/` (included in response under `price_histories`)

### Search Properties
**Request:** `GET /api/listings/search/?city=Vancouver`

**Response:**
```json
[
  {
    "id": 1,
    "title": "Beautiful Family Home",
    "street_address": "123 Main St",
    "city": "Vancouver",
    "province": "BC",
    "current_price": 750000.00,
    "bedrooms": 3,
    "bathrooms": 2,
    "square_feet": 1800,
    "image_url": "https://example.com/image.jpg"
  }
]
```

**Empty Search Results:**
```json
{
  "message": "No listings found matching the search criteria."
}
```

### AI Property Analysis
**Request:** `POST /api/listings/analyze-housing/`

**Request Body:**
```json
{
  "listing_id": 1
}
```

**Response (Fresh Analysis):**
```json
{
  "analysis": "**MARKET ANALYSIS SUMMARY**\n\nThe Toronto real estate market shows strong growth potential...\n\n**PRICE TREND ANALYSIS**\n\nRecent price movements indicate...\n\n**FUTURE PRICE PREDICTION**\n\nBased on current trends...\n\n**KEY FACTORS & RECOMMENDATIONS**\n\n• Location advantages...",
  "cached": false
}
```

**Response (Cached Analysis):**
```json
{
  "analysis": "**MARKET ANALYSIS SUMMARY**\n\nPreviously generated analysis...",
  "cached": true
}

## Error Responses

### 404 Not Found
```json
{
  "error": "Listing not found."
}
```

```json
{
  "message": "No listings found matching the search criteria."
}
```

### 400 Bad Request
```json
{
  "error": "listing_id is required."
}
```

```json
{
  "error": "Listing with id {id} not found."
}
```

### 500 Internal Server Error
```json
{
  "error": "OpenAI API key not configured."
}
```

```json
{
  "error": "AI analysis failed.",
  "details": "Error details from OpenAI API"
}
```

## Data Models

### Listing Model
```python
{
  "id": "integer (auto-generated)",
  "title": "string (max 255 chars)",
  "street_address": "string (max 255 chars)",
  "city": "string (max 100 chars)",
  "province": "string (max 100 chars)",
  "description": "text",
  "current_price": "decimal (12 digits, 2 decimal places)",
  "bedrooms": "integer",
  "bathrooms": "integer", 
  "square_feet": "integer",
  "image_url": "URL (max 500 chars)",
  "price_histories": "array of PriceHistory objects"
}
```

### PriceHistory Model
```python
{
  "id": "integer (auto-generated)",
  "listing": "foreign key to Listing",
  "price_values": "JSON array of price data",
  "date_recorded": "date (auto-populated if not provided)"
}
```

### AnalysisCache Model
```python
{
  "id": "integer (auto-generated)",
  "timestamp": "datetime (auto-generated)",
  "listing": "foreign key to Listing",
  "price_history": "foreign key to PriceHistory (nullable)",
  "analysis_result": "text (OpenAI response)"
}
```

### Future Implementation
- JWT token validation for API endpoints
- Role-based access control (RBAC)
- API key authentication for third-party integrations