import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Create() {
   const [name,setName] =  useState("");
   const [email,setEmail] =  useState("");
   const [age,setAge] =  useState(0);
   //    console.log(name,email,age);

   const [error,setError] =  useState("");
   const [msg,setMsg] =  useState("");

   const navigate = useNavigate();

   const handleSubmit = async(e) => {
    e.preventDefault();
    const addUser = {age,name,email}
    const response = await fetch("http://localhost:5000", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
            "Content-Type" : "application/json",
        },
    })
    const result = await response.json();
    if(!response.ok){
        console.log(result.error);
        setError(result.error);
    }
    if(response.ok){
        console.log(result);
        setEmail("");
        setName("");
        setAge(0);
        setMsg("Data inserted Sucessfully!");
        navigate("/all")
    }
   }

  return (
    <div className='container my-2'>
      {error && <div class="alert alert-danger" >  {error} </div>}
      { msg && <div class="alert alert-info" role="alert"> {msg} </div>}
        <h2 className='text-center'> Enter the Data  </h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">   Email address </label>
                <input type="email" className="form-control"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
                </div>
            </div>
            <div className="mb-3">
                <label  className="form-label">  Name </label>
                <input  type="text"   className="form-control"
                value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            
            <div className="mb-3">
                <label  className="form-label"> Age </label>
                <input  type="number" className="form-control"  id="exampleAge"
                 value={age} onChange={(e) => setAge(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>


    </div>
  )
}

export default Create