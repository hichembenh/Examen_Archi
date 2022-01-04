import React, {useEffect} from "react";
import Aos from 'aos'
import 'aos/dist/aos.css'
import {Button} from "@mui/material";

const Card = ({user}) => {
    useEffect(() => {
        Aos.init({duration: 3000})
    }, [])
    const handleLogin = () => {
        localStorage.setItem('profile',JSON.stringify(user))
        window.location.reload()
    }

    return (
        <div className="s-box" data-aos="zoom-out-up">
            <div className='s-b-img'>
                <img src={"https://penmadsidrap.com/uploads/blog_image/default.jpg"}/>
            </div>
            <div className='s-b-text'>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <Button onClick={handleLogin}>Connect</Button>
            </div>
        </div>
    )
}

export default Card