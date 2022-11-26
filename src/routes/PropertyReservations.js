import React, {useEffect, useState} from 'react';

import { Link, useNavigate, useParams  } from "react-router-dom";
import axios from '../api/axios';
import CardPublication from "../components/CardPublication";
import { Box, CircularProgress, Typography, TableRow, Table, TableHead, TableCell, TableBody, Paper, TableContainer} from '@mui/material';
//import InputLabel from '@mui/material/InputLabel';
//import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
//import Select from '@mui/material/Select';
import { Button } from "@mui/material";
import { Add, Check, Clear } from '@mui/icons-material';
import DateReservation from '../routes/DateReservation';



const PropertyReservations = ({filters}) => {

  const routeParams = useParams();

  const navigate = useNavigate();

  const [reservations, setReservations] = useState(null);

  let username = window.localStorage.getItem("username")
  

  const loadReservations = () => {
    if (!username){
      window.location.href = "/login";
      return;
    } 

    let params = new URLSearchParams([["property_id", routeParams.id]]);

    
    const headers = {headers:{
                     'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }}
                          
    axios({method:'post', url:'/fetchAllReservationsFromProperty/',params:params, headers:headers })
    .then((response) => {
      setReservations(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  if (!reservations){
    loadReservations();
    };

    console.log(reservations)
   
  return (                             
         <Paper style={{padding: "20px", maxHeight: "auto", height: "auto"}}>
         
    { (reservations) ?
        ((reservations.length > 0) ? 

        <TableContainer component={Paper} width="auto" maxHeight="auto">
          <Table sx={{ minWidth: 650, maxHeight: "auto" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> Reservado por </TableCell>
                <TableCell >Desde</TableCell>
                <TableCell >Hasta</TableCell>
                <TableCell >Pago</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((item) => (
                <TableRow
                  key={item.Reservation.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell  component="th" scope="row">
                    <Button onClick={() => navigate(`/viewProfile/${item.email}`)}>{item.email}</Button>
                  </TableCell>
                  <TableCell >{item.Reservation.start_date}</TableCell>
                  <TableCell >{item.Reservation.end_date}</TableCell>
                  <TableCell >{item.Reservation.paid ? <Check color="success"></Check> : <Clear color="error"></Clear>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        
        </TableContainer>
        : <Typography style={{color: "black", marginTop: "50px"}} variant="h6" gutterBottom>
          No hay ninguna reserva en esta propiedad.
        </Typography>)
      : <CircularProgress/>}
     
      <br/>
      <label htmlFor="fechaFin">Ver fechas reservadas: </label>
      <DateReservation/>
      <br/>  
      <Button variant="contained" style={{marginTop: "10px", marginBottom: "10px"}} onClick={() => navigate(-1)}>
       Volver
      </Button>
    
    </Paper>)
  
}

export default PropertyReservations
