import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const submit = async(e:any) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:8000/api/login', {
            email: email,
            password: password
        }, {withCredentials: true})
        setRedirect(true)

    }
    if(redirect) {
        return <Navigate to='/' />
    }

    return(
        <>
        <main className="form-signin">
  <form onSubmit={submit}>
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating">
      <input type="email"
      onChange={(e) => setEmail(e.target.value)}
      className="form-control" id="floatingInput" placeholder="name@example.com" />
      <label htmlFor="floatingPassword" >Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" 
      onChange={(e) => setPassword(e.target.value)}
      className="form-control" id="floatingPassword" placeholder="Password" />
      <label htmlFor="floatingPassword">Password</label>
    </div>

     <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</main>
        </>
    )
}