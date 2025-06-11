# API Documentation

## Core Listings API

### Endpoints Overview
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/listings/` | Get all property listings |
| `GET` | `/api/listings/{id}/` | Get specific property details |
| `GET` | `/api/listings/search/?city={city}` | Search properties by city |
| `GET` | `/api/listings/{id}/price-history/` | Get price history for property |
| `POST` | `/api/listings/create/` | Create new property listing |
| `PUT` | `/api/listings/{id}/update/` | Update existing property |
| `DELETE` | `/api/listings/{id}/delete/` | Delete property listing |

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
**Request:** `GET /api/listings/1/price-history/`

**Response:**
```json
[
  {
    "date": "2024-01-22",
    "price": 750000.0
  },
  {
    "date": "2024-06-15", 
    "price": 780000.0
  }
]
```

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

## Error Responses

### 404 Not Found
```json
{
  "error": "Listing not found."
}
```

### 400 Bad Request
```json
{
  "error": "Invalid request parameters."
}
```

## Authentication
Currently, the API endpoints are open and do not require authentication. Authentication will be implemented in future versions.

## Rate Limiting
No rate limiting is currently implemented for development purposes.
