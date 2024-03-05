import React from 'react'
import Header from '../../components/Header'
import './viewbuissnessprofile.css'


export default function Viewbuissnessprofile() {
    return (
        <>
            <Header />
            <p>view buissness from search page</p>
            <section>
                <div style={{ width: "100%", height: "250px", border: "1px solid black", padding: "20px" ,margin:"auto"}}>
                    <div className='container' style={{ width: "80%", height: "160px", border: "1px solid black",padding:"10px",marginTop:"20px"}}>
                        <div style={{width:"140px",height:"140px",borderRadius:"50%",backgroundColor:"grey",margin:"auto",marginLeft:"40px"}}></div>
                        <p style={{}}>Name</p>
                    </div>

                </div>
            </section>
            <section>
                <div style={{ display: "flex", border: "1px solid black", marginTop: "50px", padding: "50px" }}>
                    <div style={{ width: "70%", height: "300px", border: "1px solid black" }}>description</div>
                    <div style={{ width: "30%", height: "300px", border: "1px solid black", textAlign: "center", padding: "0" }}>
                        details

                        <p>name:</p>
                        <p>address:</p>
                        <p>email:</p>
                        <p>etc:</p>


                        <div style={{ width: "100%", height: "50px", border: "1px solid black", marginTop: "80px" }}>
                            CALL / MESSAGE / EMAIL
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div style={{ display: "flex", border: "1px solid black", marginTop: "50px", padding: "50px" }}>
                    <div style={{ width: "70%", height: "300px", border: "1px solid black" }}>photos</div>
                    <div style={{ width: "30%", height: "300px", border: "1px solid black" }}>map location</div>
                </div>
            </section>
            <section>
                <div style={{ display: "flex", border: "1px solid black", marginTop: "50px", padding: "50px" }}>
                    <div style={{ width: "70%", height: "300px", border: "1px solid black", margin: "auto" }}>Ratings and reviews</div>
                </div>
            </section>



        </>
    )
}
