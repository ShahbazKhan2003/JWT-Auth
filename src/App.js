import Header from "./components/Header";
import Login from "./components/Login";
import { Routes, Route, useNavigate } from 'react-router-dom'
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";

function App() {

  const [data, setData] = useState(false);


  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();


  const DashboardValid = async () => {
    let token = localStorage.getItem("userdatatoken");

    const res = await fetch("http://localhost:8009/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });
    const data = await res.json();

    if (data.status == 401 || !data) {
      console.log("user not valid");
    }
    else {
      console.log("User verify");
      setLoginData(data);
      history("/dash")
    }
  }

  useEffect(() => {
    setTimeout(() => {
      DashboardValid(); 
      setData(true)
    }, 2000)
  }, [])

  return (
    <>
      {
        data ? (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/dash" element={<Dashboard />}></Route>
              <Route path="*" element={<Error />}></Route>
            </Routes>
          </>

        ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }
    </>
  );
}

export default App;
