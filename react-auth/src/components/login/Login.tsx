import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import LoginForm from './LoginForm'; // assuming LoginForm is in the same directory
import AuthenticateForm from './AuthenticateForm'; // assuming AuthenticateForm is in the same directory
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/authSlice';


export const Login = () => {
    const disptach = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [loginData, setLoginData] = useState<{

        id: number,
        secret?: string,
    
        otpauth_url?: string,
    }>({id: 0})
    // Define loginData here. Adjust this according to your needs.
    const success = () => {
        setRedirect(true)
        disptach(setAuth(true))
    }

    // const success = () => {
    //     setRedirect(true)
    // }

    
    if(redirect) {
        return <Navigate to='/' />
    }

    let form;
    if(loginData?.id === 0) {
        form = <LoginForm loginData={setLoginData} />
    } else {
    form = <AuthenticateForm loginData={loginData} success={success} />
    }

    return(
        <main className='form-signin'>
           {form}
       
        </main>
    )
}