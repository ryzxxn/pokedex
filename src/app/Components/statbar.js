import React from 'react';

export default function Statbar({ percent }) {
  const width = (parseFloat(percent) / 100) * 100; // convert percent to width in pixels

  return (
    <div className='bg-[grey] h-[2px] relative w-[100%]'>
      <div className='bg-gray-300 h-full' style={{ width: percent+'px' }}></div>
    </div>
  );
}