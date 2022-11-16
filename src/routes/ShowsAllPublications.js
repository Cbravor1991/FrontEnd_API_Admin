import React, {useEffect, useState} from 'react';

import { Link, useNavigate  } from "react-router-dom";
import axios from '../api/axios';
import CardPublication from "../components/CardPublication";
import { Box, Typography } from '@mui/material';
//import InputLabel from '@mui/material/InputLabel';
//import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
//import Select from '@mui/material/Select';
import { Button } from "@mui/material";
import { Add } from '@mui/icons-material';


const ShowsAllPublications = (props) => {

  const navigate = useNavigate();
  //const [parsed_filters, setParsed_filters] = useState(props.getFilters? props.getFilters : {});
  let parsed_filters;
  
  console.log(props);
  
  if (props.getFilters){
    //setParsed_filters(props.getFilters);
    parsed_filters=props.getFilters();
  }
  else {
    //setParsed_filters({});
    parsed_filters={};
  }
  
  console.log(parsed_filters);
  

  const [publications, setPublications] = useState(null);
  //const [success, setSuccess] = useState(false);
 
  let username = window.localStorage.getItem("username");

 
  const loadPublications = () => {
    if (!username){
      window.location.href = "/login";
      return;
    } 
    const params = new URLSearchParams([['offset', 0], ['limit', 100]]);
    /*const json = JSON.stringify({ "email_user": parsed_filters.email_user,
                    "price_max": parsed_filters.precioMax,
                    "price_min": parsed_filters.precioMin,
                       "rating": parsed_filters.rating,
                       "people": parsed_filters.personas,
                      "country": parsed_filters.pais,
                     "province": parsed_filters.provincia,
                     "location": parsed_filters.localidad
                   })*/
    
    const json = JSON.parse(parsed_filters);
    console.log(json);
       
    const headers = {headers:{
                     'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }}
                          
    axios({method:'post', url:'/publications/', data:json, params:params, headers:headers })
    .then((response) => {
      setPublications(response.data);
    })
    //.then(setSuccess(true))
    .then(console.log("DONE"))
    .then(console.log(publications))
    .catch((error) => {
      console.log(error);
    });
  }
  
  //loadPublications();
  
  /*const volver = () => {
    setSuccess(false);
    window.location.reload(false);
  }*/
  
  
   useEffect(() => {
     setTimeout(() => {
         loadPublications();
      },3000);
     //return()=>clearInterval(interval)
    }, [loadPublications]);

   
  return (                             
         <>
         
    { (publications && publications.length > 0) ? 
      <Box sx={{display:'flex',flexWrap: 'wrap', mt:10 }}>
        {publications.map(item => {
          return (
              <CardPublication key={item.Publication.id} {...item} username={username} updatePublications={loadPublications} />
          )}
        )}   
      </Box>
      : <Typography style={{color: "black"}} variant="h6" gutterBottom>
        No tenés publicaciones realizadas
      </Typography>}
     
      <Button variant="contained" onClick={() => navigate("/makePublication")} endIcon={<Add />}>
        Podes realizar tu publicacion en  <Link to="/ShowsMyPublications"> Mis publicaciones </Link>
      </Button> }
    
    </>)
  
}

export default ShowsAllPublications
