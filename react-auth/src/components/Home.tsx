import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const Home = () => {
    const [message, setMessage] = useState('Loading...');
    const dispatch = useDispatch();
const auth = useSelector((state: RootState) => state.auth.value)

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get('user');
                setMessage(`Hi ${data.first_name} ${data.last_name}`);
                dispatch(setAuth(true))
            } catch (error) {
                setMessage('You are not logged in');
                dispatch(setAuth(false))
            }
        };

        fetchData();

    }, []);
    
    return (
        <div className="container mt-4 text-center">
        {auth ? <h1>{message}</h1> : <h1>You are not logged in</h1>}
        </div>
    )
}