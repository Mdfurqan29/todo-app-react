import React, { useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from '../../Config/Firebase';

const PageAuth = () => {
     
    return localStorage.getItem("uid") ? (
        <Outlet />

      ) : (
        <Navigate to={"/"} />


      );

}

export default PageAuth
