import React, {useEffect, useState} from 'react'
import axios from "axios";
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import Card from "../components/BooksCard";
import {Button, Modal} from "@mui/material";
import AddBook from "../components/AddBook";
// import AddUser from "../components/";

const Books = () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        axios.get("http://localhost:9500/books").then(data => {
            setBooks(data.data)
        })
    }, [])
    let len = books.length
    const [width, setWidth] = useState(window.innerWidth);
    let isMobile = (width <= 768);


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    return (
        <div style={{backgroundColor: 'grey'}}>
            <div>
                <Button style={{marginBottom: '-10%', color: 'blue', left: '50%'}} onClick={handleOpen}>Add book</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <AddBook len={len}/>
                </Modal>
            </div>
            <div id='tarif' className='tarif'>
                <div className="s-heading">
                    <h1 style={{color:'blue'}}>Books</h1>
                </div>
                <div className='b-container'>
                    <Swiper
                        spaceBetween={40}
                        slidesPerView={isMobile ? (1) : (3)}
                        navigation
                        pagination={{clickable: true}}
                        scrollbar={{draggable: true}}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {books.map(book =>
                            <SwiperSlide key={book.id}>
                                <Card
                                    book={book}
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Books
