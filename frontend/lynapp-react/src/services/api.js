import axios from 'axios';

const API_BASE_URL = 'https://lyn-housing-ai-app-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simple function that App.jsx expects
export const getListings = () => api.get('/listings/').then(res => res.data);

// Search listings by city (if city provided), else get all
export const searchListings = (city) => {
  if (!city) return getListings();
  return api.get(`/listings/search/?city=${encodeURIComponent(city)}`).then(res => res.data);
};

// Get city suggestions for autocomplete (unique cities from listings)
export const getCitySuggestions = async (query) => {
  // Fetch all listings, extract unique cities matching the query
  const listings = await getListings();
  const cities = Array.from(new Set(
    listings
      .map(l => l.city)
      .filter(city => city && city.toLowerCase().includes(query.toLowerCase()))
  ));
  return cities;
};

// API endpoints object (for future use)
export const listingsAPI = {
  getAllListings: () => api.get('/listings/'),
  getListing: (id) => api.get(`/listings/${id}/`),
  createListing: (data) => api.post('/listings/', data),
  updateListing: (id, data) => api.put(`/listings/${id}/`, data),
  deleteListing: (id) => api.delete(`/listings/${id}/`),
};

export default api;

/* 

WHAT IS AXIOS:
Axios is a JavaScript library for making HTTP requests to servers.
It's like a messenger that helps your frontend talk to your backend.

BENEFITS OF AXIOS:
- Simple, clean syntax for API calls
- Automatic JSON parsing (converts server responses to JavaScript objects)
- Built-in error handling
- Request/response interceptors
- Works in both browsers and Node.js
- Promise-based (works well with async/await)

AXIOS-SPECIFIC PARTS IN USAGE EXAMPLES:

EXAMPLE 1 - Getting data:
const fetchListings = async () => {
    try {
        const response = await listingsAPI.getAllListings();  // ← axios GET request
        console.log(response.data);  // ← axios puts server response in .data property
    } catch (error) {
        console.error('Error:', error.response.data);  // ← axios error handling
    }
};

EXAMPLE 2 - Creating data:
const addListing = async (formData) => {
    try {
        const response = await listingsAPI.createListing(formData);  // ← axios POST request
        console.log('Created:', response.data);  // ← axios response data
    } catch (error) {
        console.error('Error:', error.response);  // ← axios error object
    }
};

WHAT'S AXIOS vs WHAT'S NOT:

AXIOS PARTS:
- listingsAPI.getAllListings()  ← axios method call
- response.data                 ← axios response property
- error.response               ← axios error property
- The actual HTTP request/response handling

NOT AXIOS PARTS:
- async/await                  ← JavaScript syntax
- try/catch                    ← JavaScript error handling
- console.log()                ← JavaScript method
- const, function declarations ← JavaScript syntax

COMPARED TO FETCH API:
Axios is a library that simplifies making HTTP requests, 
while the Fetch API is a built-in JavaScript feature for the same purpose. 
Axios provides a more user-friendly interface, automatic JSON parsing, 
and better error handling out of the box compared to the Fetch API.
With Fetch API, you often have to manually parse JSON responses and handle errors more explicitly.
Not even that, Fetch API does not support request cancellation, 
which is a feature that helps users cancel ongoing requests if they are no longer needed, 
like when a user navigates away from a page. Axios has built-in support for those features.

When to use Fetch API:
- When you want to use a built-in feature of JavaScript without adding extra libraries.
- When you need a lightweight solution for simple HTTP requests.
- When you want to have more control over the request/response process, as Fetch API is more low-level.

When to use Axios:
- When you want a simpler, more powerful way to make HTTP requests to a server.
- When you want to handle API responses easily without extra parsing for JSON data.
- When you want to manage errors from API calls gracefully with ease. 
*/
