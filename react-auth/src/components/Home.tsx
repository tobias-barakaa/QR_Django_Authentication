import axios from "axios"
import React, { useEffect, useState } from "react"

export const Home = () => {
    const [message, setMessage] = useState('Loading...');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('user', {
                   
                });
                const user = response.data;
                setMessage(`Hi ${user.first_name} ${user.last_name}`);
            } catch (error) {
                if (error) {
                    setMessage('You are not authenticated');
                } else {
                    setMessage('An error occurred. Please try again later.');
                }
            }
        };

        fetchData();

    }, []);
    
    return (
        <div className="container mt-4 text-center">
        {message}
        </div>
    )
}