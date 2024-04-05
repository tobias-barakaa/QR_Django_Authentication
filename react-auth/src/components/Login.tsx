import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const submit = async(e:any) => {
        e.preventDefault()
        await axios.post('http://127.0.0.1:8000/api/login', {
            email: email,
            password: password
        })
        setRedirect(true)
        

    }
    if(redirect) {
        return <Navigate to='/' />
    }

    return(
        <>
       You are not logged in
        </>
    )
}