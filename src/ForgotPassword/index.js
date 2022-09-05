import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../global";
import "./forgotpassword.css";

export function ForgotPassword(){

    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[invalidErrorMessage, setInvalidErrorMessage] = useState("");

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onProceed = (e) => {
        var data = [{
            email: email
        }];
        fetch(`${API}/user/forgotpassword`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"content-type": "application/json"}
        }).then(response => {
            return response.json();
          }).then(jsonResponse => {
            if(jsonResponse.message === "Password rest link has sent to your mail") {
                alert(
                    `${jsonResponse.message}
                    Please check your mail`);
            } else {
                setInvalidErrorMessage(jsonResponse.message);
            }
        }).catch((error) => {
            console.log("error", error)
        })
        e.preventDefault();
    };


    return(
        <div className="forgotPassword">
            <div className="iconWrapper">
                <img src="https://play-lh.googleusercontent.com/oeVIBqxeSBWzTTZgOoJfbR-vXtzku_cE3RJNLFsDDrc9rAN4bBvBslC-NaFPll6KQIk=s180" alt="" />
            </div>
            <form className="fpContent" onSubmit={(e) => onProceed(e)}>
                {invalidErrorMessage && <div className="invalidErrorMessage">{invalidErrorMessage}</div>}
                <div className="userNameWrapper">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" onChange={(e) => onEmailChange(e)} value={email} required/>
                </div>
                <Button type="submit" variant="contained">Proceed</Button>
            </form>
        </div>
    );
    }