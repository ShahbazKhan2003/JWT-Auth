import React, { useState } from 'react'
import { NavLink} from "react-router-dom";
import "./mix.css"

const Register = () => {
    const [passShow , setPassShow] = useState(false);
    const [cpassShow , setCPassShow] = useState(false);

    const [inpval , setInpval] = useState({
        fname : "",
        email: "" ,
        password: "" ,
        cpassword: "" ,
    })

    const setVal = (e) =>{ 
        const {name , value} = e.target;

        setInpval(()=>{
            return{
                ...inpval,
                [name] : value
            }
        })
    }

    const addUserdata = async (e)=>{
        e.preventDefault();

        const  {fname , email , password , cpassword} = inpval;

        if(fname === ""){
            alert("please enter your name")
        }
        else if(email === ""){
            alert("Please enter your email")
        }
        else if(!email.includes("@")){
            alert("enter valid email");
        }
        else if(password === ""){
            alert("Enter your password")
        }
        else if(password.length < 6){
            alert("password must be 6 char")
        }
        else if(cpassword === ""){
            alert("Enter  your Confirm password")
        }
        else if(cpassword.length < 6){
            alert("password must be 6 char")
        }
        else if(password !== cpassword){
            alert("password and confirm password not match");
        }
        else{
            // alert("Registration Succesfull")
            // console.log("User Registeration Successfull");
            const data = await fetch("http://localhost:8009/register" , {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    fname , email , password , cpassword
                })

            });
            const res = await data.json();
            // console.log(res);
            if(res.status === 201){
                alert("user registration done");
                setInpval({...inpval , fname : "", email :"" , password:"" , cpassword:""})
            }
        }
    }

    return (
        <section>
        <div className="form_data">
            <div className="form_heading">
                <h1>Sign Up</h1>
                <p style={{textAlign:"center"}}>We are glad that you will be using Project Cloud to manage <br/> your tasks! We hope that you will get like it</p>
            </div>

            <form>
                <div className="form_input">
                    <label htmlFor="fname">Name</label>
                    <input
                        type="text"
                        name="fname"
                        id="fname"
                        placeholder="Enter your Name"
                        onChange={setVal}
                        value={inpval.fname}
                    />
                </div>
                <div className="form_input">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your Email Address"
                        onChange={setVal}
                        value={inpval.email}
                    />
                </div>
                <div className="form_input">
                    <label htmlFor="password">Password</label>
                    <div className="two">
                        <input
                            type={!passShow ? "password" : "text"}
                            name="password"
                            id="password"
                            placeholder="Enter your Password "
                            onChange={setVal}
                            value={inpval.password}
                        />
                        <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                            {!passShow ? "Show" : "Hide"}
                        </div>
                    </div>
                </div>

                <div className="form_input">
                    <label htmlFor="password">Confirm Password</label>
                    <div className="two">
                        <input
                            type={!cpassShow ? "password" : "text"}
                            name="cpassword"
                            id="cpassword"
                            placeholder="Enter your Confirm Password "
                            onChange={setVal}
                            value={inpval.cpassword}
                        />
                        <div className="showpass" onClick={()=>setCPassShow(!cpassShow)}>
                            {!cpassShow ? "Show" : "Hide"}
                        </div>
                    </div>
                </div>
                <button className="btn" onClick={addUserdata}>Sign Up</button>
                <p>Already have a Account? <NavLink to="/">Login</NavLink> </p>
            </form>
        </div>
    </section>
  )
}

export default Register
