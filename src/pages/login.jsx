import React from 'react';
import { Link } from 'react-router-dom';

const login = () => {
  return (
    <div className='p-10'>
      <p>Login page</p>
      <div className='divider'>OR</div>
      <div className='flex items-center space-x-2'>
        <p>Don't have an account?</p>
        <Link to='/signup' className='link'>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default login;
