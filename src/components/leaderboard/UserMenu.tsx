import React, { useState } from 'react';

interface UserMenuProps {
  profileMediumUrl: string;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ profileMediumUrl, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <img
        src={profileMediumUrl}
        alt="Profile"
        style={{
          width: '48px',
          height: '48px',
          objectFit: 'cover',
          borderRadius: '50%',
          cursor: 'pointer',
          border: '2px solid #ccc',
        }}
        onClick={() => setMenuOpen((open) => !open)}
      />
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '56px',
            right: 0,
            background: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: '8px',
            zIndex: 100,
            minWidth: '120px',
            padding: '8px 0',
          }}
        >
          <button
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: '8px 16px',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '1rem',
              color: '#333',
            }}
            onClick={onLogout}
          >
            Ausloggen
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
