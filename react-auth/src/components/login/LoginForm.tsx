import React from "react";
import { useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom";


const LoginForm = (props: {loginData: Function }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = async(e:any) => {
        e.preventDefault()
        const {data} = await axios.post('login', {
            email: email,
            password: password
        })
        props.loginData(data)

    }
    return <main className="form-signin">
        
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="" onChange={e => setEmail(e.target.value)} />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="" onChange={e => setPassword(e.target.value)} />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <Link to="/forgot">Forgot password</Link>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

            

        </form>
    
    </main>
    

}
  

export default LoginForm


