import React from 'react';
import { Link } from 'react-router-dom';

const login = () => {
	return (
		<div className='p-10 flex flex-col items-center gap-8 m-auto'>
			<div className='flex flex-col gap-6 w-full max-w-[325px]'>
				<form>
					<label htmlFor='email' className='block'>
						<span className='block'>Email</span>
						<input
							type='email'
							name='email'
							className='p-1 rounded w-full'
						></input>
					</label>
					<label htmlFor='password' className='block'>
						<span className='block'>Password</span>
						<input
							type='password'
							name='password'
							className='p-1 rounded w-full'
						></input>
					</label>
				</form>
				<button className='block btn btn-primary'>Login</button>
				<Link>
					<span className='block link'>Forgot Password?</span>
				</Link>
			</div>
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
