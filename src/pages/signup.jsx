import React from 'react';
import { Link } from 'react-router-dom';

const signup = () => {
  return (
    <div className='p-10'>
      <p>Sign up page</p>
      <div className='divider'>OR</div>
      <div className='flex items-center space-x-2'>
        <p>Already have an account?</p>
        <Link to='/login' className='link'>
          login
        </Link>
      </div>
    </div>
  );
};

export default signup;
