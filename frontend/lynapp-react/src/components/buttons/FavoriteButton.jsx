import { useState } from 'react';
import './styles/FavoriteButton.css';

const FavoriteButton = ({ onClick }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleToggleFavorite = (e) => {
        // If an external onClick handler is provided, call it and do nothing else.
        // This gives the parent component full control over the action.
        if (onClick) {
            onClick(e);
            return;
        }

        // If no external handler, just toggle the internal state.
        setIsFavorited(prev => !prev);
    };

    return (
        <button
            type="button"
            className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
            onClick={handleToggleFavorite}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
            <svg className="heart-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        </button>
    );
};

export default FavoriteButton;