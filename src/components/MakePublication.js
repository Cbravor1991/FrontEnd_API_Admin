import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import Logo from '../components/Logo';
import { createTheme } from '@mui/material/styles';
import { Button, ThemeProvider } from '@mui/material';
import DropDownMenuLocation from "./DropDownMenuLocation";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router-dom'
import { PrecisionManufacturing } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import AddImagesModal from "../components/AddImagesModal";
import DropDownMenuMakePublication from "./DropDownMakePublication";

const PROPERTYHANDLER_URL = '/updateProperty/';

const selectionNumbers = [0,1,2,3,4,5,6,7]


const theme = createTheme({
    palette: {
        primary: {
          main: '#dc9c13',
        },
        secondary:{
            main: '#e9bc65',
        } 
      },
}); 

const MakePublication = () => {
    const handleOpen = () => setOpen(true);

    const [open, setOpen] = useState(false);
    //let props = window.localStorage.getItem("update_publication")
    //let parse_publication = (JSON.parse(props)).Publication
    //let parse_properties = JSON.parse(props).Property
    //console.log(props)

    const userRef = useRef();
    const errRef = useRef();
    
    /*Este es el parametro id que recupero de props/*/


    /*Recomporner Json*/



    /*Datos publicacion*/
    const [id_property, setPropertyID] = useState('');
    const [id_publication, setPublicationID] = useState('');
    const [titulo, setTitle] = useState('');
    const [descrPubl, setDescrPubl] = useState('');
    const [email_user, setEmail] = useState('');
    const [precio, setPrecio] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [titleError, setTitleError] = useState(false);
    
    const [precioError, setPrecioError] = useState(false);

    const [listingInfo, setListingInfo] = useState(true);
    const [direccion, setDireccion] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [pais, setPais] = useState('');
    const [habitaciones, setHabitaciones] = useState('');
    const [banios, setBanios] = useState('');
    const [personas, setPersonas] = useState('');
    const [images, setImages] = useState('');
    const [descrProp, setDescrProp] = useState('');

    const [urls, setUrls] = useState([]);
    //const [links, setLinks] = useState([]);
    
    const handleNextClick = () => {
        
        titulo === '' ? setTitleError(true) : setTitleError(false);
        precio === '' ? setPrecioError(true) : setPrecioError(false);
        if(titulo !== '' && precio !== ''){
            setListingInfo(false);
        }
        
    }
    const handleBackClick = () => {
        setListingInfo(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack floors

        let username;
        if (!window.localStorage.getItem("username")) {
            console.log("no autorizado")
            //navigate("/login");
            window.location.href = "/login";
            return;
        } else {
            username = window.localStorage.getItem("username")
        }

        try {
            setEmail(username)
            console.log(username)
        
            
            //setUrls((window.localStorage.getItem("urls")))
            const result = JSON.parse(sessionStorage.getItem("urls"))
            
            let array = []
            let links = []; 
            
            const data = new FormData();
            let i = 0
             
              
            result.map((item) => { 
                                  links[i] = {link: item } ;    
                                  i++
                                  })
            
              
            console.log("Respuesta")
            console.log(links)
            console.log("Respuesta", 
            {
                "direction": direccion,"province": provincia,  "location": localidad,
                "country": pais, "toilets": banios, "rooms": habitaciones, "people": personas, "description": descrProp, 'images': links, "email_user": username
            }
            )
            axios.post('/createProperty',
                JSON.stringify({
                    "direction": direccion,"province": provincia,  "location": localidad,
                    "country": pais, "toilets": banios, "rooms": habitaciones, "people": personas, "description": descrProp, 'images': links, "email_user": username
                }),
                {
                    headers: { 'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                     }
                },

            ).then((response) => {
                console.log(response.data)
                axios.post('/createPublication',
                JSON.stringify({
                    'title': titulo, 'description': descrPubl, 'price': precio, 'property_id': response.data.id, 'email_user': username
                }),
                {
                    headers: { 'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                         }
                },
    
              ).then((response) => {
                console.log(response.data)
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })
            
            
             
            

            //const params = new URLSearchParams();
            //params.append('property_id', id_property)

            setSuccess(true);


        } catch (err) {
            if (!err?.response) {
                setErrMsg('No hay respuesta del servidor');
            } else if (err.response?.status === 400) {
                setErrMsg('error del tipo 400');
            } else {
                setErrMsg('el registro fallo')
            }
            // errRef.current.focus();
            console.log(err)
            setErrMsg(null)
        }
    }


    return (
        <ThemeProvider theme={theme}>
                {listingInfo ? (
                                <Stack spacing={3}  direction="column" sx={{mt: -20}}>
                                    <Typography variant="h6" gutterBottom component="div" color='#000'>
                                        Datos de la propiedad
                                    </Typography>
                                    <TextField
                                        id="outlined-basic"
                                        label="Titulo"
                                        variant="outlined"
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={titulo}
                                        required
                                        error={titleError}
                                        helperText={titleError ? 'El titulo es requerido' : ''}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Descripcion"
                                        variant="outlined"
                                        onChange={(e) => setDescrPubl(e.target.value)}
                                        value={descrPubl}
                                        
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Precio por día"
                                        variant="outlined"
                                        onChange={(e) => setPrecio(e.target.value)}
                                        value={precio}
                                        required
                                        error={precioError}
                                        helperText={precioError ? 'El precio es requerido' : ''}
                                    />
                                    <Button variant="contained" sx={{position: 'absolute', right:20, bottom: 20}} onClick={handleNextClick}>
                                        A datos de la propiedad
                                    </Button>
                                </Stack>

            ) : (           <Stack spacing={3}  direction="column" >
                                <Typography variant="h6" gutterBottom component="div" color='#000'>
                                    Ingrese los datos de la propiedad
                                </Typography>
                                <Stack direction="row" spacing={3} >
                                    <Stack direction="column" spacing={3} >
                                        <DropDownMenuLocation selected={provincia} setProvincia={setProvincia}/>
                                        <TextField

                                            id="outlined-basic"
                                            label="Direccion"
                                            variant="outlined"
                                            onChange={(e) => setDireccion(e.target.value)}
                                            value={direccion}
                                            required
                                            
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            label="Localidad"
                                            variant="outlined"
                                            onChange={(e) => setLocalidad(e.target.value)}
                                            value={localidad}
                                            required

                                        />
                                        <TextField
                                            id="outlined-basic"
                                            label="Pais"
                                            variant="outlined"
                                            onChange={(e) => setPais(e.target.value)}
                                            value={pais}
                                            required

                                        />
                                    </Stack>
                                    <Stack direction="column" spacing={3} >
                                        <DropDownMenuMakePublication values={[0,1,2,3,4,5,6,7]} name={'Baños'} setFunction={setBanios}/>
                                        <DropDownMenuMakePublication values={[0,1,2,3,4,5,6,7]} name={'Habitaciones'} setFunction={setHabitaciones}/>
                                        <DropDownMenuMakePublication values={[0,1,2,3,4,5,6,7]} name={'Personas'} setFunction={setPersonas}/>
                                        <TextField 
                                            variant="outlined"
                                            onChange={(e)=>setDescrProp(e.target.value)}
                                            label="Descripcion"
                                            value={descrProp}
                                        />
                                        <Button variant="contained" sx={{position: 'absolute', right:20, bottom: 20}} onClick={handleSubmit}>
                                            Crear Propiedad
                                        </Button>
                                        <Button variant="contained" sx={{position: 'absolute', left:20, bottom: 20}} onClick={handleBackClick}>
                                            Datos de publicación
                                        </Button>                                    
                                    </Stack>
                                </Stack>
                                        <AddImagesModal setOpen={setOpen} handleOpen={handleOpen} open={open}/>
                    </Stack>

                )}               

        </ThemeProvider>
    )
}

export default MakePublication

