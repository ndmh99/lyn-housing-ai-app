import React, { useEffect } from 'react';
import './SimpleToast.css';

const SimpleToast = ({ message, onClose }) => {
  useEffect(() => {
    // Automatically close the toast after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="simple-toast">
      <div className="toast-message">{message}</div>
      <button onClick={onClose} className="toast-close-btn">&times;</button>
    </div>
  );
};

export default SimpleToast; 