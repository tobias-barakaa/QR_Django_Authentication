import axios from "axios"
import React, { useEffect, useState } from "react"


export const Home = () => {
    const [message, setMessage] = useState('You are not authenticated')
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user', {
                withCredentials: true
            })
            const user = await response.data
            setMessage( `Hi ${user.first_name} ${user.last_name}`)
       
                
            } catch (error) {
                setMessage('You are not authenticated')
                
            }
             })();

    }, [])
    
    return (
        <div className="container mt-4 text-center">
        {message}
        </div>
    )
}