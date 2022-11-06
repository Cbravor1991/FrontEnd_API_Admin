import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import CardMyPublication from "../components/CardMyPublication";
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

const ShowsMyPublications = () => {

  const navigate = useNavigate();

  const [publications, setPublications] = useState(null);

  let username = window.localStorage.getItem("username")
  
  window.localStorage.setItem("reservado", false)
    
  
  const loadPublications = () => {
    if (!username){
      console.log("no autorizado")
      //navigate("/login");
      window.location.href = "/login";
      return;
    } 
    const params = new URLSearchParams([['email_user', username]]);
    
    axios.post('/fetchAllUserPublications/', {},{ params })
    .then((response) => {
      setPublications(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }



  useEffect(() => {
    loadPublications();
    }, []);


  return (
    <>
    { (publications) ? 
    (
      (publications.length > 0) ?
      <Box sx={{display:'flex',flexWrap: 'wrap' }}>
        {publications.map(item => {
          return (
              <CardMyPublication key={item.Publication.id} {...item} username={username} updatePublications={loadPublications} />
          )}
        )}   
      </Box>
      : <Typography style={{color: "black"}} variant="h6" gutterBottom>
        No tenés publicaciones realizadas
      </Typography>
    ) : <CircularProgress></CircularProgress>
      
    }

      <Button variant="contained" onClick={() => navigate("/makePublication")} endIcon={<Add />}>
        Realizar una publicación
      </Button>
     
    
    </>
  
  )
}

export default ShowsMyPublications
