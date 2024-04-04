import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';


export const Register = () => {
const [first_name, setFirst_name] = useState('')
const [last_name, setLast_name] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [password_confirm, setPassword_confirm] = useState('')
const [redirect, setRedirect] = useState(false)


const submit = async (e:any) => {
    e.preventDefault()
    await axios.post('http://127.0.0.1:8000/api/register', {
        first_name:first_name,
        last_name:last_name,
        email:email,
        password:password,
        password_confirm:password_confirm
    }, {withCredentials: true})

    setRedirect(true)

}

if(redirect) {
    return <Navigate to='/login' />
}


    return(
        <main className="form-signin">
  <form onSubmit={submit}>
    <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

    <div className="form-floating">
      <input type="text" className="form-control"
      onChange={(e) => setFirst_name(e.target.value)}
      id="first_name" placeholder="first_name" />
      <label htmlFor="floatingPassword" >First Name</label>
    </div>

    <div className="form-floating">
      <input type="text" className="form-control"
      onChange={(e) => setLast_name(e.target.value)}
      id="last_name" placeholder="name@example.com" />
      <label htmlFor="floatingPassword" >Last Name</label>
    </div>

    <div className="form-floating">
      <input type="email" className="form-control"
      onChange={(e) => setEmail(e.target.value)}
      id="floatingInput" placeholder="name@example.com" />
      <label htmlFor="floatingPassword" >Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control"
      onChange={(e) => setPassword(e.target.value)}
      id="password" placeholder="Password" />
      <label htmlFor="floatingPassword">Password</label>
    </div>
    <div className="form-floating">
      <input type="password" 
      onChange={(e) => setPassword_confirm(e.target.value)}
      className="form-control" id="password_confirm" placeholder="Password Confirm" />
      <label htmlFor="floatingPassword" >Password Confirm</label>
    </div>

     <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</main>
    )
}