import React from 'react';

export default function StatBar(props) {
  const { percent } = props;

  return (
    <div style={{ width: '100%', height: '1rem', backgroundColor: 'rgb(30,30,30)', borderRadius: '.5rem'}}>
      <div
        style={{
          width: `${percent}%`,
          height: '100%',
          backgroundColor: 'rgb(255,255,255)',
          transition: 'width 0.3s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          borderRadius: '.5rem'
        }}
      >
      </div>
    </div>
  );
}
