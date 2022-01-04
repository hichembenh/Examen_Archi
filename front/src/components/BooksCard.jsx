import React, {useEffect, useState} from "react";
import Aos from 'aos'
import 'aos/dist/aos.css'
import {Button, Modal} from "@mui/material";
import AddBook from "./AddBook";
import AddInvoices from "./AddInvoices";

const Card = ({book}) => {
    useEffect(() => {
        Aos.init({duration: 3000})
    }, [])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="s-box" data-aos="zoom-out-up">
            <div className='s-b-img'>
                <img src={"https://archive.org/download/theworksofplato01platiala/page/cover_t.jpg"}/>
            </div>
            <div className='s-b-text'>
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                <a>Price: {book.price}</a>
                {book.available ? <Button onClick={handleOpen}>Buy</Button> : <Button disabled>Out of stock</Button>}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <AddInvoices book={book}/>
                </Modal>
            </div>
        </div>
    )
}

export default Card