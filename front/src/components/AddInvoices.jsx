import React, {useState} from "react";
import {Box, Button, Checkbox, Grid, TextField, Typography} from "@mui/material";
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

const AddInvoices = ({book}) => {
    const [invoice, setInvoice] = useState({
        amount: 0,
        customerID: JSON.parse(localStorage.getItem('profile')).id,
        date: new Date(),
    })
    const [commande,setCommande] = useState({
        client:JSON.parse(localStorage.getItem('profile')).id,
        orderItems: {
            itemTitle:book.title,
            quantity: 0
        },
    })
    const handleSubmit = () => {
        axios.post("http://localhost:8082/api/invoices", invoice).then(() => {
            axios.post("http://localhost:9501/commandes", invoice)
        })
    }

    return (
        <Box sx={style}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Typography variant="h6" component="h2">
                        Title: {book.title}
                    </Typography> </Grid>
                <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" component="h2">
                        Available quantity: {book.quantity}
                    </Typography> </Grid>
                <Grid item xs={6} md={4}>
                    <TextField
                        id="standard-number"
                        label="Quantity to buy"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        onChange={(e) => {
                            setCommande({...commande,orderItems: {
                                bookTitle:book.title,quantity:e.target.value
                            }})
                            const total = e.target.value * book.price
                            setInvoice({...invoice, amount: total})
                        }}
                        InputProps={{ inputProps: { min: 0, max: book.quantity } }}
                    />
                </Grid>
                <Grid item xs={6} md={8}>
                    <Typography variant="h6" component="h2">
                        Total: {invoice.amount} $
                    </Typography>
                </Grid>
            </Grid>
            <Button style={{marginTop:'10%'}} onClick={handleSubmit} fullWidth variant="outlined">Buy</Button>
        </Box>
    )
}

export default AddInvoices