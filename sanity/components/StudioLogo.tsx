import React from 'react';

export function StudioLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 4px' }}>
      <img
        src="/favicon.png"
        alt="Elvin Ediz Logo"
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          objectFit: 'contain',
        }}
      />
      <span style={{ fontWeight: 600, fontSize: '14px', letterSpacing: '-0.01em' }}>
        Elvin Ediz Immigration
      </span>
    </div>
  );
}

export function StudioIcon() {
  return (
    <img
      src="/favicon.png"
      alt="Elvin Ediz"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '3px',
      }}
    />
  );
}
