import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function Jobapprovals() {

  useEffect(() => {
    axios.get('http://localhost:5000/admin/jobapprovals').then((response) => {
      console.log("response logged:", response);
      const data = response.data.data
      console.log("data logged", data);
      setData(data)

    })

  }, [])

  const [data, setData] = useState([])



  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        {data.map((item) => (
          <div>
            <hr />
            <p>Title:{item.title}</p>
            <p>budget:{item.budget}</p>
            <p>category:{item.category}</p>
            <Link className='btn btn-primary' to={`/viewjobapproval/${item._id}`}>View</Link>
            <hr />
          </div>
        ))}
      </div>

    </>
  )
}
