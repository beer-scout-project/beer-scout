import React from 'react';
import { Link } from 'react-router-dom';

const home = () => {
  return (
    <div
      className='hero min-h-full'
      style={{
        backgroundImage:
          'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
      }}
    >
      <div className='hero-overlay bg-black bg-opacity-60'></div>
      <div className='hero-content text-white text-center'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold'>Beer Scout</h1>
          <p className='mb-5'>Find bars and cheap drinks near you!</p>
          <div className='flex flex-col sm:flex-row justify-center'>
            <Link
              to='/explore'
              className='btn btn-primary sm:mr-4 mb-4 sm:mb-0'
            >
              Explore
            </Link>
            <Link to='/login' className='btn btn-secondary sm:ml-4'>
              Login / Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
