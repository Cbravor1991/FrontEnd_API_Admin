import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from '../api/axios';
import CardPublication from "../components/CardPublication";
import { Box, CircularProgress, Typography } from '@mui/material';


const ShowsAllPublications = () => {

  const [publications, setPublications] = useState(null);

  let username = window.localStorage.getItem("username")
    
  
  const loadPublications = () => {
    if (!username){
      window.location.href = "/login";
      return;
    } 
    const params = new URLSearchParams([['offset', 0], ['limit', 100]]);
    const json = {"email_user": username}
    const headers = {headers:{
                     'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }}
    axios({method:'post', url:'/publications/', data:json, params:params, headers:headers })
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
    { publications ? (
      publications.length > 0 ? 
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
    )
    : <CircularProgress></CircularProgress>
    }
       
    </>
  
  )
}

export default ShowsAllPublications
