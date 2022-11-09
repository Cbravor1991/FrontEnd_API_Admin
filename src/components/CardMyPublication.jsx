import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from '../api/axios';
import swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const DELETE_PUBLICATION_URL = '/deletePublication/';
const DELETE_PROPERTY_URL = '/deleteProperty/';
const RESERVATION_STATUS = '/reservationStatus/';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



const update = async (props) => {
  window.localStorage.setItem("update_publication", JSON.stringify (props))
  window.location.href="/updatePublications/"
}



const deletePublication = async (props, username, updateFunction) => {

  console.log(props.Publication.id)
  console.log(props.Property.id)
  let params = new URLSearchParams([['publication_id', props.Publication.id], ['email_user', username]]);
  
  console.log(params)
 
  swal.fire({
    title: "Confirmar",
    text: "¿Confirmas que deseas borrar la propiedad?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'Si, borrar!',
    cancelButtonText: 'No',
    dangerMode: true}).then(function(result) {
      if (result['isConfirmed']) {
       axios.delete(DELETE_PUBLICATION_URL,{ params })
        .then((response) => {
          updateFunction();
          console.log('entro')
          
        })
        .catch((error) => {
          console.log(error);
        });

        params = new URLSearchParams([['property_id', props.Property.id], ['email_user', username]]);

        axios.delete(DELETE_PROPERTY_URL,{ params})
        .then((response) => {
          updateFunction();
          console.log('entro')
          
        })
        .catch((error) => {
          console.log(error);
        });
      }

      window.location.href="/showsMyPublications"
      
      }
    )

}


 const viewPublication = async (props, navigate) => {
     window.localStorage.setItem("view_publication", JSON.stringify (props))
     const id = props.Publication.id;
     console.log(id);
     navigate(`/viewPublication/${id}?is_mine=true`)
   }
  
  
   async function statusPublication(props) {
    window.localStorage.setItem("information_reservation", JSON.stringify (props.Publication.id))
  
    let params = new URLSearchParams([['email_user', props.username], ['publication_id', props.Publication.id]]);
  
    const response = axios.post(RESERVATION_STATUS, {}, { params })
      .then((response) => {
        console.log(response.data)
        if((response.data) == true){
          window.location.href = "/dateReservation"
          
        }else{
          swal.fire({title: "ESTA PROPIEDAD NO TIENE RESERVAS",  icon: "error"})
        }
      })
      .catch((error) => {
        console.log(error);
      });
  
     
    
  } 



export default function CardMyPublication(props) {
    let username = props.username;
    
    const navigate = useNavigate();
    
    
  //console.log(props.Publication.id)
  //console.log(props.Property.id)

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

            <Typography variant="body2">
            <Button variant="contained" onClick={() => { statusPublication(props) }} color="success">Ver información reserva</Button>
          </Typography>
          </CardContent>
          <CardActions sx={{justifyContent:'center'}}>
            { <Button variant="contained" onClick={()=>{viewPublication(props, navigate)}} color="success">Consultar</Button> }
            <Button variant="contained" onClick={()=>{update(props)}} color="success">Modificar</Button>
            <Button variant="contained" onClick={()=>{deletePublication(props, username, props.updateLodgings)}} color="success">Eliminar</Button>
            
          </CardActions>
        </React.Fragment>
      </Card>

  );
}
