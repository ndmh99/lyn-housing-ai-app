import { useState, useEffect } from 'react';
import { getListings } from '../services/api';

/**
 * Custom hook to manage listings data fetching and state
 * 
 * @returns {Object} Object containing listings, loading state, and error state
 * @returns {Array} returns.listings - Array of listing objects
 * @returns {boolean} returns.loading - Loading state indicator
 * @returns {string|null} returns.error - Error message or null
 */
export const useListings = () => {
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
      try {
        // Ask the internet for house listings
        const data = await getListings();
        // Put the house listings in our storage box
        setListings(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        // If something went wrong, save an error message
        console.error('Error fetching listings:', err);
        setError('Failed to load listings');
      } finally {
        // No matter what happens, we're done loading
        setLoading(false);
      }
    };

    // Actually run the function to get house data
    fetchData();
  }, []); // The empty [] means "only run this once when hook loads"

  // Return the data so components can use it
  return {
    listings,
    loading,
    error
  };
};