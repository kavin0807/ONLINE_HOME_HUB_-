import React from 'react';
import PropTypes from 'prop-types';
import './UserAvatar.css';

function UserAvatar({ name, size = 40 }) {
  // Always show first letter avatar with colored background
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  return (
    <div
      className="user-avatar-initial"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#7c3aed', // purple background
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: size * 0.6,
        boxShadow: '0 2px 8px rgba(44,62,80,0.12)'
      }}
    >
      {initial}
    </div>
  );
}

UserAvatar.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  size: PropTypes.number
};

export default UserAvatar;
