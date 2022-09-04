
import { Navigate } from "react-router-dom";

export function Home(){

    return localStorage.getItem("user") ?

        (<div className="homeWrapper">
            <h1>Hi, Welcome to the App</h1>
        </div>) :

        <Navigate to = "/users/login" />
}