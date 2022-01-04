import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Swiper, SwiperSlide} from 'swiper/react';
import Card from "../components/UserCard";
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import {Button, Modal} from "@mui/material";
import AddUser from "../components/AddUser";

const User = () => {

    const [users, setUsers] = useState([])
    const [width, setWidth] = useState(window.innerWidth);
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
    // const dispatch = useDispatch()
    // const users = useSelector(state => state.usersReducer)
    // useEffect(()=>{
    //     dispatch(getCustomer())
    // },[])
    useEffect(() => {
        axios.get("http://localhost:8082/api/customers").then(data => {
            setUsers(data.data)
        })
    }, [])
    let len = users.length
    let isMobile = (width <= 768);
    return (
        <>
            <div>
                <Button style={{marginBottom: '-10%', color: 'red', left: '50%'}} onClick={handleOpen}>Add user</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <AddUser len={len}/>
                </Modal>
            </div>
            <div id='tarif' className='tarif'>
                <div className="s-heading">
                    <h1>Users</h1>
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
                        {users.map(user =>
                            <SwiperSlide key={user.id}>
                                <Card
                                    user={user}
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default User