import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import Card from "../components/Card";
import { Avatar, Box, Button, CircularProgress, Divider, Paper, Rating, Typography } from '@mui/material';
import { Add, ContactMail, ContactMailOutlined, Description, DescriptionOutlined, Edit, LocationCity, LocationOn, LocationOnOutlined, PersonOutline, VerifiedOutlined, VerifiedUserOutlined, Work, WorkOutline, WorkOutlineOutlined } from '@mui/icons-material';


const Profile = () => {

  const navigate = useNavigate();

  let username = window.localStorage.getItem("username")

  const [profileData, setProfileData] = useState();
    
  if (!username){
    console.log("no autorizado")
    //navigate("/login");
    window.location.href = "/login";
    return;
  } 

  if(!profileData){
    const params = new URLSearchParams([['user_email', username]]);

    axios.get('/getProfile/',{ params: params })
    .then((response) => {
      setProfileData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // useEffect(() => {
  //   //loadLodgings();
  //   }, []);


  return (
    <Paper sx={{width: 700, height: 600, display: 'flex', flexDirection:'column', alignItems:'center', textAlign: 'left', mt: 10}}>
      {profileData ? <>
      <Avatar
        alt={username.toLocaleUpperCase()}
        src={profileData.pic}
        sx={{ width: 100, height: 100 , marginTop: "30px", marginBottom: "50px"}}
      />

      <Typography sx={{width: '100%', padding: '0 20px 0 20px'}} variant="body2" gutterBottom>
        <b ><VerifiedUserOutlined style={{transform: "translate(0px, 7px)"}}/> Mail: </b> {profileData.email}
      </Typography>

      <Divider component="div" sx={{width: "100%"}}/>

    <Typography sx={{width: '100%', padding: '0 20px 0 20px'}} variant="body2" gutterBottom>
        <b ><PersonOutline style={{transform: "translate(0px, 7px)"}}/> Nombre: </b> {profileData.name || "sin completar"} 
      </Typography>

      <Divider component="div" sx={{width: "100%"}}/>

      <Typography sx={{width: '100%', padding: '0 20px 0 20px'}} variant="body2" gutterBottom>
        <b ><DescriptionOutlined style={{transform: "translate(0px, 7px)"}}/> Biografía: </b> <span> {profileData.bio || "sin completar"}</span> 
      </Typography>

      <Divider  sx={{width: "100%"}}/>

      <Typography sx={{width: '100%', padding: '0 20px 0 20px'}} variant="body2" gutterBottom>
        <b><WorkOutline style={{transform: "translate(0px, 7px)"}}/> Ocupación: </b> <span>{profileData.ocupation || "sin completar"}</span> 
      </Typography>

      <Divider sx={{width: "100%"}}/>

      <Typography sx={{width: '100%', padding: '0 20px 0 20px'}} variant="body2" gutterBottom>
        <b ><LocationOnOutlined style={{transform: "translate(0px, 7px)"}}/> Ubicación: </b> <span>{profileData.location || "sin completar"}</span> 
      </Typography>

      <Divider sx={{width: "100%"}}/>
     
      

      {/* <Typography sx={{width: '100%', padding: '0 20px 0 20px'}} variant="body2" gutterBottom>

        <b style={{width: '300px'}}>Calificación como casero: </b> <Rating name="read-only" style={{transform: "translate(0px, 7px)"}} value={3.3} precision={0.5} readOnly />

      </Typography> */}

      <Button sx={{marginTop: "40px"}} variant="contained" onClick={() => navigate("/profile/edit")} startIcon={<Edit />}>
        Editar
      </Button>
      </>
     :<CircularProgress></CircularProgress>}
    </Paper>
  
  )
}

export default Profile
