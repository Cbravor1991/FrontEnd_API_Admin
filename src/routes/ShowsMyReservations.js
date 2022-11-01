import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { Box, Button, Typography , Card, CardContent, CardActions} from '@mui/material';
import { Add } from '@mui/icons-material';
import swal from 'sweetalert2';

const ShowsMyReservations = () => {

  const navigate = useNavigate();

  const [reservations, setReservations] = useState(null);

  let username = window.localStorage.getItem("username")
  
  const cancelReservation = (reservation_id) => {

    swal.fire({
      title: "Confirmar",
      text: "¿Confirmas que deseas cancelar la reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Si, cancelar',
      cancelButtonText: 'No',
      dangerMode: true}).then(function(result) {
        if (result['isConfirmed']) {
          const params = new URLSearchParams([['email_user', username], ['reservation_id', reservation_id]]);
          axios.delete('deleteReservation/', {params},{ params })
          .then(() => {
            setReservations(null);
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }
    )
  }
  
  if (!reservations) {
    const params = new URLSearchParams([['email_user', username]]);

    axios.post('fetchAllUserReservations/', {},{ params })
    .then((response) => {
      setReservations(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }


  return (
    <>
    { (reservations && reservations.length > 0) ? 
      <Box sx={{display:'flex',flexWrap: 'wrap' }}>
        {
        reservations.map(item => {
          return ( //               <CardPublication key={item.Publication.id} {...item} username={username} updatePublications={loadPublications} />

              
              <Card variant="outlined" key={item.id}>
              <CardContent>      
                <Typography variant="body2">
                  Desde: {item.start_date}
                  <br />
                 Hasta: {item.end_date}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Total: ${item.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => alert("No implementado todavia")}>Ver publicación</Button>
                </CardActions>
                <CardActions>

                <Button size="small" onClick={() => cancelReservation(item.id)}  color="error"> Cancelar reserva </Button>
              </CardActions>
            </Card>


          )}
        )}   
      </Box>
      : <Typography style={{color: "black"}} variant="h6" gutterBottom>
          No tenés reservas realizadas.
      </Typography>
    }
       
    </>
  
  )
}

export default ShowsMyReservations
