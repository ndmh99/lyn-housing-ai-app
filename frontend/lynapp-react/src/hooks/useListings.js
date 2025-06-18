import { useState, useEffect } from 'react';
import { listingsAPI } from '../services/api';

/**
 * Custom hook to manage listings data fetching and state
 * 
 * @param {string|number} param - City name (string) to filter listings or listing ID (number) to fetch specific listing
 * @returns {Object} Object containing listings, loading state, and error state
 * @returns {Array|Object} returns.listings - Array of listing objects or single listing object
 * @returns {boolean} returns.loading - Loading state indicator
 * @returns {string|null} returns.error - Error message or null
 */
export const useListings = (param = '') => {
  // This creates a box to store our house listings (starts empty)
  const [listings, setListings] = useState([]);
  
  // This creates a box to remember if we're still getting data (starts as true)
  const [loading, setLoading] = useState(true);
  
  // This creates a box to store error messages if something goes wrong (starts empty)
  const [error, setError] = useState(null);

  // This runs automatically when the hook is first used
  useEffect(() => {
    // This is a function that gets our house data from the internet
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        
        // Check if param is a number (listing ID) or string (city)
        if (typeof param === 'number') {
          data = await listingsAPI.getListing(param).then(res => res.data); // Fetch specific listing by ID
        } else {
          data = await listingsAPI.searchListings(param).then(res => res.data);
        }
        
        // Put the house listings in our storage box
        setListings(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        // If something went wrong, save an error message
        console.error('Error fetching listings:', err);
        setListings([]);
        setError(
          err?.response?.data?.message ||
          'Failed to load listings'
        );
      } finally {
        // No matter what happens, we're done loading
        setLoading(false);
      }
    };

    // Actually run the function to get house data
    fetchData();
  }, [param]); // Re-run when param changes

  // Return the data so components can use it
  return {
    listings,
    loading,
    error
  };
};