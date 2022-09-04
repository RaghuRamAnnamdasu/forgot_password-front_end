import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../global";

import "./login.css";


export function Login() {
    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[invalidErrorMessage, setInvalidErrorMessage] = useState("");

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onLogin = (e) => {
        var data = [{
            email: email,
            password: password
        }];
        fetch(`${API}/user/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"content-type": "application/json"}
        }).then(response => {
            return response.json();
          }).then(jsonResponse => {
            if(jsonResponse.message === "Successful Login") {
                localStorage.setItem("user", JSON.stringify({token: jsonResponse.token, userName: jsonResponse.name}));
                console.log(jsonResponse);
                navigate("/home");
            } else {
                setInvalidErrorMessage(jsonResponse.message);
            }
        }).catch((error) => {
            console.log("error", error)
        })
        e.preventDefault();
    };

    return (
      <div className="login">
        <div className="iconWrapper">
            <img src="https://play-lh.googleusercontent.com/oeVIBqxeSBWzTTZgOoJfbR-vXtzku_cE3RJNLFsDDrc9rAN4bBvBslC-NaFPll6KQIk=s180" alt="" />
        </div>
        <form className="loginContent" onSubmit={(e) => onLogin(e)}>
            {invalidErrorMessage && <div className="invalidErrorMessage">{invalidErrorMessage}</div>}
            <div className="userNameWrapper">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" onChange={(e) => onEmailChange(e)} value={email} required/>
            </div>
            <div className="passwordWrapper">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={(e) => onPasswordChange(e)} value={password} required/>
            </div>
            <Button type="submit" variant="contained">Login</Button>
            <div className="noAccount">Don't have an account? 
                <span onClick={() => navigate("/users/signup")}>&nbsp;SignUp</span>
            </div>
            <div className="forgotPasswordLink"> 
                <span onClick={() => navigate("/users/forgotpassword")}>&nbsp;Forgotten Password ?</span>
            </div>
        </form>
      </div>
    );
}