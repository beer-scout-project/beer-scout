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
							className='p-1 rounded w-full text-black
              shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
						></input>
					</label>
					<label htmlFor='password' className='block'>
						<span className='block'>Password</span>
						<input
							type='password'
							name='password'
							className='p-1 rounded w-full text-black'
						></input>
					</label>
				</form>
				<button className='block btn btn-primary'>Login</button>
				<div className='block link no-underline cursor-default'>
					<Link onClick={() => console.log('forgot password')} className='text'>
						Forgot Password?
					</Link>
				</div>
			</div>
			<div className='divider'>OR</div>
			<div className='flex flex-col items-center gap-2 w-full max-w-[325px]'>
				<button className='block btn btn-secondary w-full'>
					<Link to='/signup'>Create Account</Link>
				</button>
			</div>
		</div>
	);
};

export default login;
