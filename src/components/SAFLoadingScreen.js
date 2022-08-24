import React from 'react';

export default function SAFLoadingScreen() {
  return (
    <div className='spinner-container py-80'>
      <span className='sr-only'>Loading...</span>
      <div className='grid items-center justify-center'>
        <div className='loading-spinner'></div>
      </div>
      <div className='text-center'>
        <h1 className='text-indigo-600'>Simulating your impact...</h1>
      </div>
    </div>
  );
}
