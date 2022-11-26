import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from '../api/axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { StarRate } from '@mui/icons-material';
import { $ } from 'radio';


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

      axios.post('/saveQueryPublication',
                JSON.stringify({
                    'user_email': username, 'publication_id': id
                }),
                {
                    headers: { 'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                         }
                },
    
              ).then((response) => {
                console.log("cargo preferencias")
                console.log(id)
                navigate(`/viewPublication/${id}`)
                }).catch((error) => {
                    console.log(error)
                })




      
    }
    
  
    return (
    
      <Card onClick={()=>{viewPublication(props.Publication.id)}} style={{cursor: "pointer"}} variant="outlined" sx={{m:1}}>
        <React.Fragment>
          <CardContent>
            
           <div sx={{display:'flex',flexWrap: 'wrap' }}>
                  <img style={{borderRadius: "10px"}} alt="Preview" height="150" src={list[0]} />
           </div>
             
            <Typography variant="subtitle2" style={{maxWidth: "300px", textAlign:"left", fontWeight: "bold"}}  gutterBottom>
              {props.Publication.title}
            </Typography>
            <Typography variant="body2" component="div" style={{maxWidth: "300px", minHeight: "150px", textAlign:"left"}}>
              {props.Publication.description}
            </Typography>
            
            <Typography variant="body1" style={{fontWeight: "bold"}} color="text.secondary">
              $ {props.Publication.price} noche
            </Typography>
            {props.Publication.rating ? <Typography variant="subtitle2"><StarRate fontSize="small" style={{color: "#faaf00", transform: "translate(0px, 4px)"}}/> {props.Publication.rating} </Typography> : "Sin calificar"}


          </CardContent>

        </React.Fragment>
      </Card>

  );
}
