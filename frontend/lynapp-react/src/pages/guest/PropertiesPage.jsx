import { useListings } from '../../hooks/useListings';
import ListingCard from '../../components/ListingCard';
import './styles/PropertiesPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import PropertySearchBox from '../../components/PropertySearchBox';
import { useState, useRef } from 'react';

const PropertiesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [gridLayout, setGridLayout] = useState('three-col'); // 'two-col', 'three-col'
  
  const params = new URLSearchParams(location.search);
  const pageParam = parseInt(params.get('page'), 10) || 1;
  const cityParam = params.get('city') || '';

  const [currentPage, setCurrentPage] = useState(pageParam);
  const listingsSectionRef = useRef(null);

  const { listings, loading, error } = useListings(cityParam);

  // Pagination logic
  const getItemsPerPage = () => {
    return gridLayout === 'two-col' ? 6 : 9; // 3 rows × 2 cols = 6, or 3 rows × 3 cols = 9
  };

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(listings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = listings.slice(startIndex, endIndex);

  const handleLayoutChange = (layout) => {
    setGridLayout(layout);
    currentPage ? setCurrentPage(currentPage) : setCurrentPage(1);
  };

  // Handle page change by clicking on the pagination buttons
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);

      // Update the URL with the new page number
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('page', String(newPage));
      navigate({ search: searchParams.toString() }, { replace: true });
    }
  };

  // Enhanced Pagination component with smart page display
  const PaginationControls = () => {
    // Generate smart page numbers with ellipsis
    const generatePageNumbers = () => {
      const pageNumbers = [];
      
      if (totalPages <= 5) {
        // Show all pages if 5 or fewer
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Smart pagination logic
        if (currentPage <= 3) {
          // Show first 3 pages, ellipsis, and last page
          pageNumbers.push(1, 2, 3, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
          // Show first page, ellipsis, and last 3 pages
          pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
        } else {
          // Show first page, ellipsis, current page and neighbors, ellipsis, last page
          pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
      }
      
      return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();

    return (
      !loading && !error && listings.length > 0 && totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {startIndex + 1}-{Math.min(endIndex, listings.length)} of {listings.length} properties
          </div>
          <div className="pagination-controls">
            {/* First Page Button */}
            <button 
              className="pagination-btn first"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              title="Go to first page"
            >
              ⇤ First
            </button>
            
            {/* Previous Button */}
            <button 
              className="pagination-btn prev"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            
            {/* Smart Page Numbers */}
            <div className="page-numbers">
              {pageNumbers.map((pageNum, index) => {
                if (pageNum === '...') {
                  return (
                    <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                      ...
                    </span>
                  );
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            {/* Next Button */}
            <button 
              className="pagination-btn next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
            
            {/* Last Page Button */}
            <button 
              className="pagination-btn last"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              title="Go to last page"
            >
              Last ⇥
            </button>
          </div>
        </div>
      )
    );
  };

  // -------------------- Properties Page Render Section Start --------------------
  return (
    <div className="properties-page">
      <PropertySearchBox
        initialValue={cityParam}
        onSubmit={city => {
          const trimmed = city.trim();
          navigate(trimmed ? `/properties/?city=${encodeURIComponent(trimmed)}` : '/properties');
          listingsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
      <div className="filters-section-container">
        <div className="filters-section">
          <div className="container">
            <div className="filters-header">
              <h3>Filter & Sort</h3>
              <span className="results-count">{listings.length} properties found</span>
            </div>
            <div className="filters-grid">
              <div className="filter-group">
                <label>Price Range</label>
                <div className="price-range">
                  <input type="number" placeholder="Min price" />
                  <span>to</span>
                  <input type="number" placeholder="Max price" />
                </div>
              </div>
              <div className="filter-group">
                <label>Property Type</label>
                <select>
                  <option value="">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Bedrooms</label>
                <div className="bedroom-pills">
                  {[1, 2, 3, 4, '5+'].map(num => (
                    <button key={num} className="pill-btn">{num}</button>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <label>Sort By</label>
                <select>
                  <option value="recommended">AI Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="properties container" ref={listingsSectionRef}>
        <div className="section-header">
          <div className="header-content">
            <h2>Featured Properties {cityParam && `in ${cityParam}`}</h2>
            <p>Discover top investment opportunities selected by our AI</p>
          </div>
          <div className="property-stats">
            <div className="stat-item">
              <span className="stat-number">{listings.length}</span>
              <span className="stat-label">Properties</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">AI Match Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$2.4M</span>
              <span className="stat-label">Avg. Value</span>
            </div>
          </div>
        </div>
        <div className="view-controls">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <span className="icon">⊞</span> Grid View
            </button>
            <button
              className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              <span className="icon">🗺️</span> Map View
            </button>
          </div>
          {viewMode === 'grid' && (
            <div className="layout-options">
              <button 
                className={`layout-btn ${gridLayout === 'two-col' ? 'active' : ''}`}
                onClick={() => handleLayoutChange('two-col')}
                title="2 columns"
              >
                ⊞⊞
              </button>
              <button 
                className={`layout-btn ${gridLayout === 'three-col' ? 'active' : ''}`}
                onClick={() => handleLayoutChange('three-col')}
                title="3 columns"
              >
                ⊞⊞⊞
              </button>
            </div>          )}        </div>
        
        {/* Top Pagination Controls - Only show in grid mode */}
        {viewMode === 'grid' && <PaginationControls />}
        
        {viewMode === 'map' ? (
          /* Map View Development Message */
          <div className="development-message">
            <div className="development-icon">🚧</div>
            <h3>Map View Coming Soon!</h3>
            <p>We're working hard to bring you an interactive map experience. This feature is currently under development and will be available in a future update.</p>
            <div className="development-features">
              <p><strong>Upcoming features:</strong></p>
              <ul>
                <li>Interactive property map with pins 📍</li>
                <li>Neighborhood insights and boundaries 🗺️</li>
                <li>Nearby amenities visualization ⛪</li>
              </ul>
            </div>
            <button 
              className="switch-to-grid-btn"
              onClick={() => setViewMode('grid')}
            >
              <span className="icon">⊞</span> Switch to Grid View
            </button>
          </div>
        ) : (
          <div className={`property-grid ${gridLayout}`}>
            {/* Loading State */}
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Finding the best properties for you, please wait...</p>
                <div className="loading-skeleton">
                  <div className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line short"></div>
                      <div className="skeleton-line"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) :
              /* Error State */
              error ? (
                <div className="error-container">
                  <div className="error-icon">⚠️</div>
                  <h3>Oops! Something went wrong</h3>
                  <p>{error}</p>
                  <button className="retry-btn" onClick={() => window.location.reload()}>
                    Try Again
                  </button>
                </div>
              ) :
                /* Empty State */
                listings.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">🏠</div>
                    <h3>No properties found</h3>
                    <p>Try searching for a different city or check back later.</p>
                  </div>
                ) : (                  /* Properties List - Show only current page */
                  currentListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))
                )}
          </div>
        )}
        
        {/* Bottom Pagination Controls - Only show in grid mode */}
        {viewMode === 'grid' && <PaginationControls />}
      </section>
    </div>
  );
  // -------------------- Properties Page Render Section End --------------------
};

export default PropertiesPage;
