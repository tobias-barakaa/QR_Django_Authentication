import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

const Reset = () => {
const [password, setPassword] = useState('')
const [password_confirm, setPassword_confirm] = useState('')
const {token} = useParams();
const [redirect, setRedirect] = useState(false)

    const submit = async(e:any) => {
        e.preventDefault();
        try {
            await axios.post('reset', {
                token: token,
                password: password,
                password_confirm: password_confirm
            
            })
            setRedirect(true)
        } catch (error) {
            
        }
    }
    if(redirect) {
        return <Navigate to='/login' />
    }
  return (
    <div>
        <main className="form-signin">
  <form onSubmit={submit}>
    <h1 className="h3 mb-3 fw-normal">Reset yourPassword</h1>

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

     <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Submit</button>
  </form>
</main>
      
    </div>
  )
}

export default Reset
