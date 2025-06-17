import React from 'react';
import './styles/AiAnalysisButton.css';

const AiAnalysisButton = ({ onClick }) => {
    return (
        <button
            type="button"
            className="ai-analysis-btn"
            onClick={onClick}
        >
            <svg className="magic-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
                <path d="M22 2L20 4" />
                <path d="M2 22L4 20" />
            </svg>
            <span>Magic LynAI</span>
        </button>
    );
};

export default AiAnalysisButton; 