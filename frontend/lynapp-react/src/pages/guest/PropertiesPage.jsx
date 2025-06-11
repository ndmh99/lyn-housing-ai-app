import { useListings } from '../../hooks/useListings';
import ListingCard from '../../components/ListingCard';
import './styles/PropertiesPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import PropertySearchBox from '../../components/PropertySearchBox';
import { useState } from 'react';

const PropertiesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [gridLayout, setGridLayout] = useState('two-col'); // 'two-col', 'three-col'
  const [currentPage, setCurrentPage] = useState(1);

  const params = new URLSearchParams(location.search);
  const cityParam = params.get('city') || '';

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
  // Reset to page 1 when layout changes
  const handleLayoutChange = (layout) => {
    setGridLayout(layout);
    setCurrentPage(1);
  };

  // Reusable pagination component
  const PaginationControls = () => (
    !loading && !error && listings.length > 0 && totalPages > 1 && (
      <div className="pagination-container">
        <div className="pagination-info">
          Showing {startIndex + 1}-{Math.min(endIndex, listings.length)} of {listings.length} properties
        </div>
        <div className="pagination-controls">
          <button 
            className="pagination-btn prev"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          
          <div className="page-numbers">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button 
            className="pagination-btn next"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    )
  );

  // -------------------- Properties Page Render Section Start --------------------
  return (
    <div className="properties-page">
      <PropertySearchBox
        initialValue={cityParam}
        onSubmit={city => {
          const trimmed = city.trim();
          navigate(trimmed ? `/properties/?city=${encodeURIComponent(trimmed)}` : '/properties');
        }}
      />
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
      <section className="properties container">
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
                <li>Interactive property map with pins</li>
                <li>Neighborhood insights and boundaries</li>
                <li>Walkability and transit scores</li>
                <li>Nearby amenities visualization</li>
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
                <div className="loading-skeleton">
                  {[...Array(itemsPerPage)].map((_, i) => (
                    <div key={i} className="skeleton-card">
                      <div className="skeleton-image"></div>
                      <div className="skeleton-content">
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line short"></div>
                        <div className="skeleton-line"></div>
                      </div>
                    </div>
                  ))}
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
