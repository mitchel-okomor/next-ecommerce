import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

function Signin() {
  const initialState = {
    email: '',
    password: ''
  };
  const [userData, setUserData] = useState(initialState);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    const res = await postData('auth/login', userData);
    if (res.err)
      return dispatch({ type: 'NOTIFY', payload: { error: res.err } });

    dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
    dispatch({
      type: 'AUTH',
      payload: {
        token: res.access_token,
        user: res.user
      }
    });

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accesstoken',
      expires: 7
    });
    localStorage.setItem('firstLogin', true);
    //return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/');
  }, [auth]);

  return (
    <div>
      <Head>
        <title>Sign in page</title>
      </Head>
      <div>
        <form
          className='mx-auto my-5'
          style={{ maxWidth: '500px' }}
          onSubmit={handleSubmit}
        >
          <div className='form-group mb-3'>
            <label htmlFor='email'>Email address</label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              aria-describedby='emailHelp'
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div className='form-group form-check'></div>
          <button type='submit' className='btn btn-dark w-100'>
            Login
          </button>
          <p className='my-2'>
            You don't have an account?
            <Link href='/register'>
              <a style={{ color: 'crimson' }}>Register</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
