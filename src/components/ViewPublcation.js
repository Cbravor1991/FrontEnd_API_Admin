import { useRef, useState, useEffect, useCallback, memo, useMemo } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, useNavigate } from "react-router-dom";
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
import { CircularProgress } from "@mui/material";



const ViewPublication = (() => {

  const routeParams = useParams();

  const navigate = useNavigate();

  const [publicationData, setPublicationData] = useState(null);

  let username = window.localStorage.getItem("username")
    
  
  const loadPublicationData = () => {
    if (!username){
      window.location.href = "/login";
      return;
    } 
    const params = JSON.stringify({'email_user': username});
    
    axios.post('/publications/', {},{ params })
    .then((response) => {
      console.log(response.data)
      setPublicationData(response.data.filter((x) => (x.Publication.id == routeParams.id))[0]);
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
                <section style={{ backgroundColor: 'grey' }}>
                  {(publicationData && images) ? <>
                    <h2>Datos de la publicación</h2>

                    <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
                        {publicationData.Publication.title}
                    </Typography>

                    <div className="form-group multi-preview">
                      {(images || []).map(image => (
                          <img src={image.link} alt='preview' height="200"/>
                      ))}
                    </div>

                    <Typography variant="h6" component="div">
                        {publicationData.Property.description}
                    </Typography>

                    <Typography variant="body2">
                      $ {publicationData.Publication.price}
                    </Typography>

                    <Typography variant="body2">
                      {publicationData.Property.direction}
                    </Typography>

                    <Typography variant="body2">
                      {publicationData.Property.province}
                    </Typography>
                      
                    <Typography variant="body2">
                      {publicationData.Property.location}
                    </Typography>
                      
                    <Typography variant="body2">
                      {publicationData.Property.country}
                    </Typography>
                      
                    <Typography variant="body2">
                      {publicationData.Property.toilets} baños
                    </Typography>
                      
                    <Typography variant="body2">
                      {publicationData.Property.rooms} habitaciones
                    </Typography>
                      
                    <Typography variant="body2">
                      para {publicationData.Property.people} personas
                    </Typography>
                      
                    <Typography variant="body2">
                      {publicationData.Publication.description}
                    </Typography>
                    
                    <Typography variant="body2">
                      Puntaje promedio: {publicationData.Publication.rating}
                    </Typography>
                    
                    <Button variant="contained" onClick={()=>{makeReservation(publicationData)}}//props)}} 
                    disabled={false} color="success">Realizar reserva</Button>
                    
                    <Button variant="contained" onClick={()=>{calificar(publicationData)}}//props)}} 
                    disabled={true} color="success">Calificar</Button>
                    
                      
                    <Button variant="filled" color="primary" 
                    onClick={() => {navigate(-1);return false;}}>Volver</Button>
                  </> :
                  <CircularProgress/>}

                </section>
    )
})

export default ViewPublication
