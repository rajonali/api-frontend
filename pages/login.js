import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, userLogin, userLogout } from '../redux/slices/auth';
import AuthService from '../utils/AuthService'

import Router from 'next/router';

export default function Login() {

  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

//  const {signIn, signOut, getUserCookie} = authActions;

  const dispatch = useDispatch()
  const authSelector = useSelector(selectUser)

  const auth = new AuthService()

  async function onSubmit(e) {
    e.preventDefault();
    const data  = await auth.signIn({username, password})
    Router.push('/account')
//    dispatch(userLogin(data))
  }



  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <button onClick={(e) => (signOut())} type="button">signout</button>

{"dsada" ? (<p>Logged In</p>):(<span>Not Logged In</span>)}

        <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
<button type="submit">Log-In</button>      
      </form>
    </div>
  )

}


