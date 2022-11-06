import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import Card from "../components/Card";
import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const ShowsLodgings = () => {

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
    <>
    { (lodgings && lodgings.length > 0) ? 
      <Box sx={{display:'flex',flexWrap: 'wrap' }}>
        {lodgings.map(item => {
          return (
              <Card key={item.id} {...item} username={username} updateLodgings={loadLodgings} />
          )}
        )}   
      </Box>
      : <Typography style={{color: "black"}} variant="h6" gutterBottom>
        No tenés propiedades cargadas
      </Typography>

      
    }

      <Button variant="contained" onClick={() => navigate("/cargaPropiedad")} endIcon={<Add />}>
        Cargar propiedad
      </Button>
     
    
    </>
  
  )
}

export default ShowsLodgings
