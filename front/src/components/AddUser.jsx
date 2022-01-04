import React, {useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
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

const AddUser = ({len}) => {
    const [user, setUser] = useState({name: '', email: '', id: len + 100})
    const handleSubmit = () => {
        axios.post("http://localhost:8080/api/customers", user).then(() => {
            window.location.reload()
        })
    }

    return (
        <Box sx={style} style={{padding: "2%"}}>
            <TextField id="filled-basic" label="Name" variant="filled" onChange={(e) => {
                setUser({...user, name: e.target.value})
            }} required/>
            <TextField id="filled-basic" label="Email" variant="filled" onChange={(e) => {
                setUser({...user, email: e.target.value})
            }} required/>
            <Typography variant="h6" component="h2">
                ID {user.id}
            </Typography>
            <Button onClick={handleSubmit} variant="outlined" style={{margin: '10%'}}>Add</Button>
        </Box>
    )
}

export default AddUser