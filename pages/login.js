import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import {useRouter} from "next/router"
import {useAuth} from '../utils/auth'

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, userLogin, userLogout } from '../redux/slices/auth';
import { authActions} from '../utils/auth2'


export default function Login() {

  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {signIn, signOut, getUserCookie} = authActions;

  const dispatch = useDispatch()
  const authSelector = useSelector(selectUser)


  async function onSubmit(e) {
    e.preventDefault();
    const data  = await signIn({username, password})
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


