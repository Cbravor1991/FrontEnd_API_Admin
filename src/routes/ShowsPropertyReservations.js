import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { Box, Button, Typography , Card, CardContent, CardActions, CircularProgress} from '@mui/material';
import swal from 'sweetalert2';

const ShowsPropertyReservations = () => {

  const navigate = useNavigate();

  const [reservations, setReservations] = useState(null);

  let id_property = window.localStorage.getItem("id_property")  
  
  
  if (!reservations) {
    const params = new URLSearchParams([['property_id', id_property]]);

    axios.post('fetchAllReservationsFromProperty/', {},{ params })
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
      <>
      <Typography variant="h5"> Reservas por usuario:</Typography>
      <br />
      <Box sx={{display:'flex',flexWrap: 'wrap' }}>
        {
        
        reservations.map(item => {
          return ( //               <CardPublication key={item.Publication.id} {...item} username={username} updatePublications={loadPublications} />

              
              <Card variant="outlined" key={item.Reservation.id}>
              <CardContent>      
                <Typography variant="h6"> Usuario: {item.email} </Typography>
                <Typography variant="h6">
                  Desde: {item.Reservation.start_date}
                  <br />
                 Hasta: {item.Reservation.end_date}
                </Typography>
              </CardContent>
              </Card>

          )}
        )}   
      </Box>
      </>
      : <Typography style={{color: "black"}} variant="h6" gutterBottom>
          La publicaciónno tiene reservas realizadas.
      </Typography>)
    : <CircularProgress></CircularProgress>
    }
       
    </>
  
  )
}

export default ShowsPropertyReservations
