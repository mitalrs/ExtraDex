import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { redirect } from "react-router-dom";

export default function CheckAuth({children}) {
    const token = Cookies.get('token');



    async function fetchUser() {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if(!res.ok){
            redirect('/login');
        }
    };

    
    useEffect(() => {
        fetchUser();
    }, []);

    
    return children;
}