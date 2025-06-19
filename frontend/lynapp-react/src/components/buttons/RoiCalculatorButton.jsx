import React from 'react';
import './styles/RoiCalculatorButton.css';

const RoiCalculatorButton = ({ onClick }) => {
    const handleRedirect = (e) => {
        // Always call the parent's onClick handler if it exists.
        if (onClick) {
            onClick(e);
        }

        // If the parent called e.preventDefault(), stop right here.
        if (e.defaultPrevented) {
            return;
        }

        window.open('https://www.calculator.net/roi-calculator.html', '_blank', 'noopener,noreferrer');
    };

    return (
        <button
            type="button"
            className="roi-calc-btn"
            onClick={handleRedirect}
            aria-label="Open ROI Calculator"
        >
            <svg
                className="calculator-icon"
                fill="currentColor"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2H6ZM6 4H18V8H6V4ZM7 10H9V12H7V10ZM11 10H13V12H11V10ZM15 10H17V12H15V10ZM7 14H9V16H7V14ZM11 14H13V16H11V14ZM15 14H17V16H15V14ZM7 18H9V20H7V18ZM11 18H13V20H11V18ZM15 18H17V20H15V18Z" />
            </svg>
        </button>
    );
};

export default RoiCalculatorButton; 