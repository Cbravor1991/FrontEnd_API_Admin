import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import Card from "../components/Card";
import { Avatar, Box, Button, Divider, Paper, Rating, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';




const Profile = () => {

  const navigate = useNavigate();

  const [lodgings, setLodgings] = useState([]);

  let username = window.localStorage.getItem("username")
    
  
  const loadLodgings = () => {
    if (!username){
      console.log("no autorizado")
      //navigate("/login");
      window.location.href = "/login";
      return;
    } 
    const params = new URLSearchParams([['email_user', username]]);
    
    axios.post('/fetchAllUserProperties/', {},{ params })
    .then((response) => {
      setLodgings(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }



  useEffect(() => {
    loadLodgings();
    }, []);


  return (
    <Paper sx={{width: 700, height: 600, display: 'flex', flexDirection:'column', alignItems:'center', textAlign: 'left', fontSize: 'none'}}>

      <Avatar
        alt={username.toLocaleUpperCase()}
        src="broken-image.jpg"
        sx={{ width: 100, height: 100 , marginTop: "30px", marginBottom: "50px"}}
      />


    <Typography sx={{width: '100%', padding: '0 20px 0 20px'}} variant="body2" gutterBottom>
        <b style={{width: '300px'}}>Nombre: </b> sin completar 
      </Typography>

      <Divider component="div" sx={{width: "100%"}}/>

      <Typography sx={{width: '100%', padding: '0 20px 0 20px'}} variant="body2" gutterBottom>
        <b style={{width: '300px'}}>Descripción: </b> <span>sin completar</span> 
      </Typography>

      <Divider component="body1" sx={{width: "100%"}}/>

      <Typography sx={{width: '100%', padding: '0 20px 0 20px'}} variant="body2" gutterBottom>

        <b style={{width: '300px'}}>Calificación como casero: </b> <Rating name="read-only" style={{transform: "translate(0px, 7px)"}} value={3.3} precision={0.5} readOnly />

      </Typography>


    </Paper>
  
  )
}

export default Profile