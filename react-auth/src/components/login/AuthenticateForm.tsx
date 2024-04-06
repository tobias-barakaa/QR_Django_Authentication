import axios from 'axios';
import React, { useState } from 'react'

const AuthenticateForm = (props: {
    loginData: {  
    id: number,
    secret?: string,
    otpauth_url?: number,
    },
    success: Function,

}) => {
    const [code, setCode] = useState('')

const submit = async(e:any) => {
    e.preventDefault();
    try {
        const response = await axios.post('tow-factor', {
            ...props.loginData,
            code: code
        })
        if (response.status === 200) {
            props.success()
        }
        
    } catch (error) {
        
    }
}


  return (
    <main className="form-signin">
        
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please Insert your authenticator code</h1>
            <div className="form-floating">
                <input type="text" className="form-control"
                 id="floatingInput" placeholder="sex digit" onChange={e => setCode(e.target.value)} />
            </div>
            
           
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>

            

        </form>
    
    </main>
  )
}

export default AuthenticateForm
