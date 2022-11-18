import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { Box, Button, Typography , Card, CardContent, CardActions, CircularProgress} from '@mui/material';
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
  
  const payReservation = (reservation_id) => {

    swal.fire({
      title: "Confirmar",
      text: "¿Confirmas que deseas pagar la reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      dangerMode: true}).then(function(result) {
        if (result['isConfirmed']) {
          const params = new URLSearchParams([['reservation_id', reservation_id]]);
          axios.post('payReservation/', {}, {params})
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
    { reservations ? (
      reservations.length > 0 ? 
      <Box sx={{display:'flex',flexWrap: 'wrap' }}>
        {
        reservations.map(item => {
          return ( //               <CardPublication key={item.Publication.id} {...item} username={username} updatePublications={loadPublications} />

              
              <Card variant="outlined" key={item.Reservation.id}>
              <CardContent>      
                <Typography variant="h6"> {item.title} </Typography>
                <Typography variant="body2">
                  Desde: {item.Reservation.start_date}
                  <br />
                 Hasta: {item.Reservation.end_date}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Total: ${item.Reservation.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => {navigate(`/viewPublication/${item.Reservation.publication_id}?is_reserved=true`)}}>Ver publicación</Button>
              </CardActions>
                
              {item.paid ? 
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Ya fue pagada
              </Typography>:
                <CardActions>
                <Button size="small" onClick={() => payReservation(item.Reservation.id)} >Pagar reserva</Button>
              </CardActions>}

              <CardActions>
                <Button size="small" onClick={() => cancelReservation(item.Reservation.id)}  color="error">Cancelar reserva</Button>
              </CardActions>
            </Card>


          )}
        )}   
      </Box>
      : <Typography style={{color: "black"}} variant="h6" gutterBottom>
          No tenés reservas realizadas.
      </Typography>)
    : <CircularProgress></CircularProgress>
    }
       
    </>
  
  )
}

export default ShowsMyReservations
