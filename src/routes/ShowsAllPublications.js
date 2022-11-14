import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from '../api/axios';
import CardPublication from "../components/CardPublication";
import { Box, CircularProgress, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from "@mui/material";


const ShowsAllPublications = () => {

  const [publications, setPublications] = useState(null);
  const [success, setSuccess] = useState(false);

  let username = window.localStorage.getItem("username")
  
  
    const [email_user, setEmailUser] = useState("");
    const [precioMin, setPrecioMin] = useState(null);
    const [precioMax, setPrecioMax] = useState(null);
    const [localidad, setLocalidad] = useState("");
    const [provincia, setProvincia] = useState("");
    const [pais, setPais] = useState("");
    const [rating, setRating] = useState(null);
    const [personas, setPersonas] = useState(null);
  
  
  const loadPublications = () => {
    if (!username){
      window.location.href = "/login";
      return;
    } 
    const params = new URLSearchParams([['offset', 0], ['limit', 100]]);
    const json = { "email_user": email_user,
                    "price_max": precioMax,
                    "price_min": precioMin,
                       "rating": rating,
                       "people": personas,
                      "country": pais,
                     "province": provincia,
                     "location": localidad
                   }
    
    
       
    const headers = {headers:{
                     'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }}
                
    console.log(provincia)            
    axios({method:'post', url:'/publications/', data:json, params:params, headers:headers })
    .then((response) => {
      setPublications(response.data);
    })
    .then(setSuccess(true))
    .catch((error) => {
      console.log(error);
    });
  }
  
  const volver = () => {
    setSuccess(false);
    window.location.reload(false);
  }

  /*useEffect(() => {
    loadPublications();
    }, []);*/




  return (                             
                 <>
    { (publications && publications.length > 0) ? 
      <Box sx={{display:'flex',flexWrap: 'wrap' }}>
        {
        publications.map(item => {
          return (
              <CardPublication key={item.Publication.id} {...item} username={username} updatePublications={loadPublications} />
          )}
        )}   
      </Box>
      : (<><Typography style={{color: "black"}} variant="h6" gutterBottom>
          No hay publicaciones realizadas.
      </Typography>

      <Typography style={{color: "black"}} variant="body2" gutterBottom>
            Podes realizar tu publicacion en <Link to="/ShowsMyPublications"> Mis publicaciones </Link>
      </Typography></>)
    }
       
    </>  
  )
}

export default ShowsAllPublications
