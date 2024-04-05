import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Forgot = () => {
    const [email, setEmail] = useState('');
    const [notify, setNotify] = useState({
        show: false,
        error: false,
        message: ''
    })

    const submit = async(e:any) => {
        e.preventDefault();
        try {
        await axios.post('forgot', {email: email})
     setNotify({
            show: true,
            error: false,
            message: 'Please check your email'
        
     })
            
        } catch (error) {
            setNotify({
                show: true,
                error: true,
                message: "Error occured"
            })
            
        }

    }
    let info;
    if (notify.show) {
        info = <div className={notify.error ? 'alert alert-danger' : 'alert alert-success'}>{notify.message}</div>
    }
  return (
    <>
    {info}
    <div>
 <main className="form-signin">
  <form onSubmit={submit}>
    <h1 className="h3 mb-3 fw-normal">Please put your email</h1>

    <div className="form-floating">
      <input type="email"
      onChange={(e) => setEmail(e.target.value)}
      className="form-control" id="floatingInput" placeholder="name@example.com" />
      <label htmlFor="floatingPassword" >Email address</label>
    </div>
   

     <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Submit</button>
  </form>
</main>
    </div>
    </>
  )
}

export default Forgot
