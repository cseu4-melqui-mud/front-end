import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const InitializeGame = () => {
    const [data, setData] = useState() 
    
    const token = localStorage.getItem('token')
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${token}` 
        }
    };
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/adv/init/`, axiosConfig)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
            console.log(err)
        })
    }, [])

    if (!data) {
        return (
            <div>LOL</div>
        )
    }
    return (
        <div>
            <p>Player: {data.name}</p>
            <p>Title: {data.title}</p>
            <p>Description: {data.description}</p>
            <p>Players in Room: {data.players}</p>
        </div>
    )
}