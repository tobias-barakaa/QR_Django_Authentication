import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react'
import qrcode from 'qrcode'

const AuthenticateForm = (props: {
    loginData: {  
    id: number,
    secret?: string,
    otpauth_url?: string,
    },
    success: Function,

}) => {
    const [code, setCode] = useState('')
    const [img, setImg] = useState<ReactElement | null>(null);

    useEffect(() => {
        if (props.loginData.otpauth_url) {
            qrcode.toDataURL(props.loginData.otpauth_url, (err, src) => {
                setImg(<img src={src} alt="qr" style={{width: '100%'}} />)
            })
        }
    }, [props.loginData.otpauth_url])

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
    <main>
        
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please Insert your authenticator code</h1>
            <div className="form-floating">
                <input type="text" className="form-control"
                 id="floatingInput" placeholder="sex digit" onChange={e => setCode(e.target.value)} />
            </div>
            
           
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>

            

        </form>
        {img}
    
    </main>
  )
}

export default AuthenticateForm
