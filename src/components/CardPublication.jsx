import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from '../api/axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


//const DELETE_PUBLICATION_URL = '/deletePublication/';
//const DELETE_PROPERTY_URL = '/deleteProperty/';

export default function CardPublication(props) {
    let username = props.username

    const navigate = useNavigate();

//Solución provisoria
    
    const [images, setImages] = useState([]);
    
    const list = [];

    const loadImages = () => {
      if (!username){
        console.log("no autorizado")
        //navigate("/login");
        window.location.href = "/login";
        return;
      } 
      const params = new URLSearchParams([['property_id', props.Publication.property_id]]);
    
      axios.post('/fetchAllPropertyImages/', {},{ params })
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
    
    images.map(item => {
                  list.push(item.link)
                })
  
  useEffect(() => {
    loadImages();
    }, []);

    const viewPublication = async (id) => {
      window.localStorage.setItem("view_publication", JSON.stringify (props))
      //console.log(id)
      navigate(`/viewPublication/${id}`)
    }
    
  
    return (
    
      <Card variant="outlined" sx={{m:1}}>
        <React.Fragment>
          <CardContent>
            
           <div sx={{display:'flex',flexWrap: 'wrap' }}>
                  <img alt="Preview" height="150" src={list[0]} />
           </div>
             
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              {props.Publication.title}
            </Typography>
            <Typography variant="h6" component="div">
              {props.Publication.description}
            </Typography>
            
            <Typography variant="body2">
              {props.Publication.price}
            </Typography>
          </CardContent>
          <CardActions sx={{justifyContent:'center'}}>
            <Button variant="contained" onClick={()=>{viewPublication(props.Publication.id)}} color="success">Consultar</Button>
          </CardActions>
        </React.Fragment>
      </Card>

  );
}
