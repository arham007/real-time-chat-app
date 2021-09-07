import React, { useState } from 'react'
import './Main.css';
import {Link} from 'react-router-dom';
import logo from '../images/image1.png'

let user;
const Main = () => {
    const send=()=>{
        user=document.getElementById("#inputname").value;
        document.getElementById("#inputname").value="";
    }
    const [name, setname] = useState("")


    return (
        <div className="main">
            <div className="wrapper">
                <div style={{textAlign:"center",margin:"20px"}}>
                    <img src={logo} style={{width:"20%",textAlign:"center"}} />
                </div>
                <div style={{textAlign:"center"}}>
                    <h2 style={{color:"#fff",fontFamily:"fantasy",fontSize:"34px",fontWeight:"bolder"}}>Chat App</h2>
                </div>
                <div style={{textAlign:"center"}} ><input onChange={(e)=> setname(e.target.value)} className="inputn" type="text" id="#inputname" /></div>
                <div style={{textAlign:"center"}}>
                   <Link onClick={(e)=> !name ? e.preventDefault():null} to="/chat"><button onClick={send} className="btn">Login</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Main;
export{ user }
