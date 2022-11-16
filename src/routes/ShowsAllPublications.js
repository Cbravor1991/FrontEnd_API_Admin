import React, {useEffect, useState} from 'react';

import { Link, useNavigate  } from "react-router-dom";
import axios from '../api/axios';
import CardPublication from "../components/CardPublication";
import { Box, CircularProgress, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from "@mui/material";
import { Add } from '@mui/icons-material';


const ShowsAllPublications = ({filters}) => {

  const navigate = useNavigate();
  
  const [appliedFilters, setAppliedFilters] = useState(null);

  const [publications, setPublications] = useState(null);

  let username = window.localStorage.getItem("username")
  
  
  const loadPublications = () => {
    if (!username){
      window.location.href = "/login";
      return;
    } 
    const params = new URLSearchParams([['offset', 0], ['limit', 100]]);
    let json = {};
    if (filters){
      let parsed_filters = JSON.parse(filters);
      json = { "email_user": null,
                "price_max": (parsed_filters.price_max == 0 ? null : parsed_filters.price_max),
                "price_min": (parsed_filters.price_min == 0 ? null : parsed_filters.price_min),
                    "rating": (parsed_filters.rating == 0 ? null : parsed_filters.rating),
                    "people": (parsed_filters.people == 0 ? null : parsed_filters.people),
                  "country": parsed_filters.country,
                  "province": parsed_filters.province,
                  "location": parsed_filters.location
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
        Podes realizar tu publicacion en <Link style={{marginLeft: "5px"}} to="/ShowsMyPublications"> Mis publicaciones </Link>
      </Button>
    
    </>)
  
}

export default ShowsAllPublications
