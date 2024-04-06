import React from "react";
import { useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";


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

    const onSuccess = async(googleUser: any) => {
       const { status } = await axios.post('google-auth', {
            token: googleUser.tokenId
        
        })
        if (status === 200) {
            props.loginData({id: 0})
        }
    }

    const onFailure = (e: any) => {
        alert(e.error);
        
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
    <GoogleLogin 
    clientId="295457904698-gphlk7g7a6lkhiet0ihp5jn98l4uv7mq.apps.googleusercontent.com"
     buttonText="Login with Google" 
     onSuccess={onSuccess} onFailure={onFailure} 
     className="w-100 btn btn-lg btn-primary"
     cookiePolicy={'single_host_origin'} />
    </main>
    

}
  

export default LoginForm


