import React, { useEffect, useState } from 'react'
import './verifications.css'
import Header from '../../components/Header'
import axios from 'axios';
import { Link } from 'react-router-dom';




export default function Verifications() {

    useEffect(() => {
        axios.get('http://localhost:5000/admin/buissnessverification').then((response) => {
            console.log(response, "res logged");
            const data = response.data.data
            setData(data)
        })
    }, []);

    const [data, setData] = useState([])

    





return (
    <>
        <Header />
        <div style={{ width: "100%", height: "75px", border: "1px solid" }}>
            <p style={{ textAlign: "center" }}>pending buisness profile verifications</p>
        </div>
        {data.map((item) => (
            <div style={{ width: "500px", height: "100%", border: "1px solid", margin: "auto", textAlign: "center" }}>
                <p>name: {item.name}</p>
                <p>username: {item.username}</p>
                <p>category: {item.category}</p>
                <p>email: {item.email}</p>
                <p> _id:{item._id}</p>
                <p>loginid: {item.loginId}</p>
                <Link className='btn btn-primary' to={`/buissnessverification/${item._id}`}>VIEW</Link>
            </div>
        ))
        }
    </>
)
}

