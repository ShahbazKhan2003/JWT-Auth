import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import "./header.css"
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
    const history = useNavigate();
    // console.log(logindata);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutuser = async ()=>{
        let token = localStorage.getItem("userdatatoken");
        
        const res = await fetch("/logout" , {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : token,
                Accept  : "application/json"
            },
            credentials : "include"
        });

        const data = await res.json();
        console.log(data);
        
        if(data.status == 201){ 
            console.log("user logout");
            localStorage.removeItem("userdatatoken");
            setLoginData(false);
            history("/")
        }
        else{
            console.log("error");
        }
    }

    const goDash = ()=>{
        history("/dash");
    }

    const goError = ()=>{
        history("*");
    }

    return (
        <>
            <header>
                <nav>
                    <h1>My page</h1>
                    <div className="avtar">
                        {
                            logindata.ValidUserOne ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }
                    </div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            logindata.ValidUserOne ? (
                                <>
                                    <MenuItem onClick={()=>{
                                        goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={()=>{
                                        logoutuser()
                                        handleClose()
                                    }}>Logout</MenuItem>

                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={()=>{
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            ) 

                        }
                        <>
                        </>
                    </Menu>
                </nav>
            </header>
        </>

    )
}


export default Header


