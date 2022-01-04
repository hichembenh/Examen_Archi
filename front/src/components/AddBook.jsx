import React, {useState} from "react";
import {Box, Button, Checkbox, Grid, TextField} from "@mui/material";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddBook = () => {
    const [book, setBook] = useState({
        title: '',
        available: '',
        author: '',
        price: 0,
        publishingDay: new Date(),
        quantity: 0
    })
    const handleSubmit = () => {
        axios.post("http://localhost:9500/books", book).then(() => {
            window.location.reload()
        })
    }

    return (
        <Box sx={style} style={{padding: "2%"}}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <TextField id="filled-basic" label="Title" variant="filled" onChange={(e) => {
                        setBook({...book, title: e.target.value})
                    }} required/> </Grid>
                <Grid item xs={6} md={4}>
                    <TextField id="filled-basic" label="Author" variant="filled" onChange={(e) => {
                        setBook({...book, author: e.target.value})
                    }} required/> </Grid>
                <Grid item xs={6} md={4}>
                    <TextField
                        id="standard-number"
                        label="Quantity"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        onChange={(e) => {
                            setBook({...book, quantity: e.target.value})
                        }}
                    />
                </Grid>
                <Grid item xs={6} md={8}>
                    <TextField
                        id="standard-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        onChange={(e) => {
                            setBook({...book, price: e.target.value})
                        }}
                    />
                </Grid>
                <Grid item xs={6} md={2}>
                    <Checkbox checked={book.available} onClick={(e)=>{setBook({...book,available: e.target.checked})}} />
                </Grid>
                <Grid item xs={6} md={10}>
                    <Button onClick={handleSubmit} fullWidth variant="outlined">Add</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddBook