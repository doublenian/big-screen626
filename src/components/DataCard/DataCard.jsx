import React from 'react';
import './DataCard.css';

// SVG图标组件
const icons = {
  user: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
    </svg>
  ),
  room: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 9.3V4h-3v2.6L12 3L2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7zM10 10c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" />
    </svg>
  ),
  property: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 8H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm8 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
    </svg>
  ),
  project: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
  ),
  construction: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.783 15.172l2.121-2.121 5.996 5.996-2.121 2.121zM17.5 10c1.93 0 3.5-1.57 3.5-3.5 0-.58-.16-1.12-.41-1.6l-2.7 2.7-1.49-1.49 2.7-2.7c-.48-.25-1.02-.41-1.6-.41C15.57 3 14 4.57 14 6.5c0 .41.08.8.21 1.16l-1.85 1.85-1.78-1.78.71-.71L9.88 5.61 12 3.49c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0L8.47 4.2l-1.42-1.42L8.47 1.36c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0L5.64 1.36 4.22 2.78l1.41 1.41L4.2 5.61c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l1.42-1.42 1.78 1.78.71-.71 1.78 1.78L9.46 9.3c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l1.85-1.85C13.2 8.92 13.59 9 14 9c.58 0 1.12-.16 1.6-.41l2.7 2.7 1.49-1.49-2.7-2.7C17.34 7.12 17.5 6.58 17.5 6z" />
    </svg>
  )
};

const DataCard = ({ icon, title, value, large = false }) => {
  const IconComponent = icons[icon] || icons.building;

  return (
    <div className={`data-card ${large ? 'data-card--large' : ''}`}>
      <div className="data-card__icon">
        {IconComponent}
      </div>
      <div className="data-card__content">
        <div className="data-card__title">{title}</div>
        <div className="data-card__value">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      </div>
      <div className="data-card__glow"></div>
    </div>
  );
};

export default DataCard; 