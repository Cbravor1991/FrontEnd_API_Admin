import { useRef, useState, useEffect, useCallback, memo, useMemo } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from '../components/Logo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router-dom'
import { PrecisionManufacturing } from "@mui/icons-material";
//import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CircularProgress, Divider, Paper, Rating } from "@mui/material";



const ViewPublication = (() => {

  const routeParams = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  let isReserved = searchParams.get("is_reserved");
  let isMine = searchParams.get("is_mine");

  const navigate = useNavigate();

  const [publicationData, setPublicationData] = useState(null);

  //let isReserved = window.localStorage.getItem("reservado");
  console.log(isReserved)

  let username = window.localStorage.getItem("username")
    
  
  const loadPublicationData = () => {
    if (!username){
      window.location.href = "/login";
      return;
    } 
    const params = new URLSearchParams([['email_user', username], ['publication_id', routeParams.id]]);
    
    axios.post('/getPublicationById/', {},{ params })
    .then((response) => {
      console.log(response.data)
      setPublicationData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  if (!publicationData){
    loadPublicationData();
  }
    
    const [images, setImages] = useState(null);

    const loadImages = () => {
      if (!username){
        console.log("no autorizado")
        //navigate("/login");
        window.location.href = "/login";
        return;
      } 
      console.log(publicationData);
      const params = new URLSearchParams([['property_id', publicationData.Publication.property_id]]);
    
      axios.post('/fetchAllPropertyImages/', {},{ params })
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    if (publicationData && !images){
      loadImages();
    }

   const makeReservation = async (props) => {
     window.localStorage.setItem("make_reservation", JSON.stringify (props))
     window.location.href="/makeReservation/"
    }
    
    const calificar = async (props) => {
     window.localStorage.setItem("calificar", JSON.stringify (props))
     window.location.href="/review/"
    }




    return (
    <Paper component="form" sx={{minWidth: 350, maxWidth: 800, padding: "20px", minHeight: 300, backgroundColor: 'white', textAlign: "left"}}> 
                  {(publicationData && images) ? <>

                    <Typography variant="h5" gutterBottom>
                        {publicationData.Publication.title}
                    </Typography>

                    <div className="form-group multi-preview">
                      {(images || []).map(image => (
                          <img src={image.link} alt='preview' height="200"/>
                      ))}
                    </div>

                    <Typography variant="subtitle2">
                    {publicationData.Property.people} personas - {publicationData.Property.rooms} habitaciones - {publicationData.Property.toilets} baños
                    </Typography>

                    <Typography variant="h6">
                      $ {publicationData.Publication.price} noche
                    </Typography>

                    <Divider></Divider>
                    <Typography variant="body1" component="div">
                        {publicationData.Property.description}
                    </Typography>

                    <Typography variant="body1">
                      {publicationData.Publication.description}
                    </Typography>

                    <Divider></Divider>

                    <Typography variant="body2">
                    {publicationData.Property.country} {publicationData.Property.province}  {publicationData.Property.location}
                    </Typography>

                    <Typography variant="body2">
                      {publicationData.Property.direction}
                    </Typography>
                      
                    
                    <Divider></Divider>

                      {publicationData.Publication.rating ? 
                       <div><Typography component="legend">Calificación promedio</Typography>
                       <Rating name="read-only" value={publicationData.Publication.rating} readOnly /></div>
                        : 
                        <Typography variant="body2">Aún no cuenta con calificaciones</Typography>}
                    
                    
                    {
                      (!isMine && !isReserved) ? 
                      <Button variant="contained" onClick={()=>{makeReservation(publicationData)}} color="success" fullWidth>Reservar</Button>
                      : ""
                    }

                    {
                      (isReserved) ? 
                      <Button variant="contained" onClick={()=>{calificar(publicationData)}} color="success" fullWidth>Calificar</Button>
                      : ""
                    }
                    
                      
                    <Button variant="contained" color="primary" 
                    onClick={() => {navigate(-1);return false;}} fullWidth>Volver</Button>
                  </> :
                  <CircularProgress/>}

                </Paper>
    )
})

export default ViewPublication