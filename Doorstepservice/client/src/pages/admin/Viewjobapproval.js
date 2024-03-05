import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Viewjobapproval() {

    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/admin/viewjobpost/${id}`).then((response) => {
            console.log('resssss', response);
            const data = response.data.data
            setData(data)
        })

    }, [])

    const [data, setData] = useState({})

    const updateStatus = (id) => {
     axios.get(`http://localhost:5000/admin/updatejobstatus/${id}`).then((response)=> {
        console.log(response);
        const message = response.data.message

     })
    }

    return (
        <>
            <Header />
            <div style={{ textAlign: "center" }}>
                <p>{data.title}</p>
                <p>{data.category}</p>
                <p>{data.description}</p>
                <p>{data.requirements}</p>
                <p>{data.location}</p>
                <p>{data.duration}</p>
                <p>{data.completion}</p>
                <p>{data.budget}</p>
                <p>{data.images}</p>
                <button onClick={() => { updateStatus(data._id) }} className='btn btn-primary'>Approve</button>

            </div>
        </>
    )
}
