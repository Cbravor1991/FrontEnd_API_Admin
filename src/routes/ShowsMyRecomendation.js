import React, {useEffect, useState} from 'react';

import { Link, useNavigate  } from "react-router-dom";
import axios from '../api/axios';
import CardPublication from "../components/CardPublication";
import { Box, CircularProgress, Typography } from '@mui/material';
//import InputLabel from '@mui/material/InputLabel';
//import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
//import Select from '@mui/material/Select';
import { Button } from "@mui/material";
import { Add } from '@mui/icons-material';



const ShowsAllPublications = ({filters}) => {

  const navigate = useNavigate();
  //const [parsed_filters, setParsed_filters] = useState(props.getFilters? props.getFilters : {});
  let parsed_filters;
  
  const [appliedFilters, setAppliedFilters] = useState(null);

  const [publications, setPublications] = useState(null);

  let username = window.localStorage.getItem("username")
  

  const loadPublications = () => {
    if (!username){
      window.location.href = "/login";
      return;
    } 
    const params = new URLSearchParams([['offset', 0], ['limit', 4]]);
    let json = {"email_user": username};
    if (!filters){
      let parsed_filters = JSON.parse(filters);
      json = { "email_user": username,
                
                  "province": "Cordoba",
                  
                   }
    }    
    
    const headers = {headers:{
                     'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }}
                          
    axios({method:'post', url:'/publications/', data:json, params:params, headers:headers })
    .then((response) => {
      setAppliedFilters(filters);
      setPublications(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  if (appliedFilters != filters){
    loadPublications();
  }

  if (!publications){
    loadPublications();
    };

   
  return (                             
         <>
         
    { (publications) ?
        ((publications.length > 0) ? 
        <Box sx={{display:'flex',flexWrap: 'wrap', mt:10 }}>
          {publications.map(item => {
            return (
                <CardPublication className='cards-recomendations' key={item.Publication.id} {...item} username={username} updatePublications={loadPublications} />
            )}
          )}   
        </Box>
        : <Typography style={{color: "black", marginTop: "50px"}} variant="h6" gutterBottom>
          No se encontraron publicaciones
        </Typography>)
      : <CircularProgress/>}
     
      
    
    </>)
  
}

export default ShowsAllPublications
