import React, { useState } from 'react';


export const Register = () => {
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [passwordConfirm, setPasswordConfirm] = useState('')


const submit = (e:any) => {
    e.preventDefault()
    console.log('what')

}



    return(
        <main className="form-signin">
  <form onSubmit={submit}>
    <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

    <div className="form-floating">
      <input type="text" className="form-control"
      onChange={(e) => setFirstName(e.target.value)}
      id="firstName" placeholder="FirstName" />
      <label htmlFor="floatingPassword" >First Name</label>
    </div>

    <div className="form-floating">
      <input type="text" className="form-control"
      onChange={(e) => setLastName(e.target.value)}
      id="lastName" placeholder="name@example.com" />
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
      onChange={(e) => setPasswordConfirm(e.target.value)}
      className="form-control" id="password_confirm" placeholder="Password Confirm" />
      <label htmlFor="floatingPassword" >Password Confirm</label>
    </div>

     <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</main>
    )
}