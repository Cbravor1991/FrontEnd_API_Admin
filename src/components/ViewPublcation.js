import { useRef, useState, useEffect, useCallback, memo, useMemo } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
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



const ViewPublication = (() => {


    let props = window.localStorage.getItem("view_publication")
    let parse_publication = (JSON.parse(props)).Publication
    let parse_properties = (JSON.parse(props)).Property
    
    //console.log(props)
    
    
    //const navigate = useNavigate();    

    //const userRef = useRef();
    //const errRef = useRef();
    /*Este es el parametro id que recupero de props/*/


    /*Recomporner Json*/



    /*Datos publicacion*/
    const [id_property, setPropertyID] = useState(parse_properties.id);
    const [id_publication, setPublicationID] = useState(parse_publication.id);
    const [titulo, setTitle] = useState(parse_publication.title);
    const [descripcion, setDescripcion] = useState(parse_publication.description);
    const [email_user, setEmail] = useState(parse_publication.email_user);
    const [precio, setPrecio] = useState(parse_publication.price);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [rating, setRating] = useState(parse_publication.rating);
    //const [reservado, setReservado] = useState(false);
    
    const [direccion, setDireccion] = useState(parse_properties.direction);
    const [localidad, setLocalidad] = useState(parse_properties.location);
    const [provincia, setProvincia] = useState(parse_properties.province);
    const [pais, setPais] = useState(parse_properties.country);
    const [habitaciones, setHabitaciones] = useState(parse_properties.rooms);
    const [banios, setBanios] = useState(parse_properties.toilets);
    const [personas, setPersonas] = useState(parse_properties.people);
    

    
    const [images, setImages] = useState([]);

    let username = window.localStorage.getItem("username")

    //setReservado(window.localStorage.getItem("reservado"))

    const loadImages = () => {
      if (!username){
        console.log("no autorizado")
        //navigate("/login");
        window.location.href = "/login";
        return;
      } 
      const params = new URLSearchParams([['property_id', id_property]]);
    
      axios.post('/fetchAllPropertyImages/', {},{ params })
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }


   const makeReservation = async (props) => {
     window.localStorage.setItem("make_reservation", JSON.stringify (props))
     window.location.href="/makeReservation/"
    }
    
    const calificar = async (props) => {
     window.localStorage.setItem("calificar", JSON.stringify (props))
     window.location.href="/review/"
    }
    
   /*const isReserved = memo(() => {
      if(reservado) 
        return true;
      else
        return false;
      })  */


  useEffect(() => {
    loadImages();
    }, []);


    return (
                <section style={{ backgroundColor: 'grey' }}>
                    <Logo />

                    <h2>Datos de la publicación</h2>

                    <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
                        {titulo}
                    </Typography>

                    <div className="form-group multi-preview">
                      {(images || []).map(image => (
                          <img src={image.link} alt='preview' height="200"/>
                      ))}
                    </div>

                    <Typography variant="h6" component="div">
                        {descripcion}
                    </Typography>
            
                    <Typography variant="body2">
                       $ {precio}
                    </Typography>

                    <Typography variant="body2">
                      {direccion}
                    </Typography>

                    <Typography variant="body2">
                       {provincia}
                    </Typography>
                       
                    <Typography variant="body2">
                       {localidad}
                    </Typography>
                       
                    <Typography variant="body2">
                       {pais}
                     </Typography>
                       
                     <Typography variant="body2">
                       {banios} baños
                     </Typography>
                       
                     <Typography variant="body2">
                       {habitaciones} habitaciones
                     </Typography>
                       
                     <Typography variant="body2">
                       para {personas} personas
                     </Typography>
                       
                     <Typography variant="body2">
                       {descripcion}
                     </Typography>
                     
                     <Typography variant="body2">
                       Puntaje promedio: {rating}
                     </Typography>
                     
                     <Button variant="contained" onClick={()=>{makeReservation(props)}} 
                     disabled={false} color="success">Realizar reserva</Button>
                     
                     <Button variant="contained" onClick={()=>{calificar(props)}} 
                     disabled={true} color="success">Calificar</Button>
                     
                       
                     <Button variant="filled" color="primary" 
                     onClick={() => {window.history.go(-1);return false;}}>Volver</Button>

                </section>
    )
})

export default ViewPublication
