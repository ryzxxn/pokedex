import React from 'react';

type StatbarProps = {
  percent: string;
};

export default function Statbar({ percent }: StatbarProps) {
  const width = (parseFloat(percent) / 100) * 100; // convert percent to width in pixels

  return (
    <div className='bg-[grey] h-2 relative w-[100%]'>
      <div className='bg-white h-full' style={{ width: percent+'px' }}></div>
    </div>
  );
}
