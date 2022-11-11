import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import Logo from '../components/Logo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Paper } from "@mui/material";


//const PROPERTYHANDLER_URL = '/updateProperty/';

const MakePublication = () => {


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

            const response = await axios.post('/createProperty',
                JSON.stringify({
                    "direction": direccion,"province": provincia,  "location": localidad,
                    "country": pais, "toilets": banios, "rooms": habitaciones, "people": personas, "description": descrProp, 'images': links, "email_user": username
                }),
                {
                    headers: { 'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                     }
                },

            );
            
             
            
            const response_2 = await axios.post('/createPublication',
            JSON.stringify({
                'title': titulo, 'description': descrPubl, 'price': precio, 'property_id': response.data.id, 'email_user': username
            }),
            {
                headers: { 'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                     }
            },

          );

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
            errRef.current.focus();

            setErrMsg(null)
        }
    }


    return (
        <>
            {success ? (
                <section style={{ backgroundColor: 'white' }}>
                    <h1>Publicacion creada con exito!</h1>
                    <p>
                        <a href="/showsMyPublications">Ir a mis publicaciones</a>
                    </p>
                </section>
            ) : (

                <Paper style={{ padding: '15px' }}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form className="custom" onSubmit={handleSubmit}>
                    <h3>Ingrese los datos de la publicación</h3>

                        <br />
                        <Link to="/fileLoaderGallery2" style={{color: "blue"}}>Cargar Fotos</Link>

                        <br />
                        
                       
                        <label htmlFor="titulo">
                            Titulo:

                        </label>
                        <input
                            type="text"
                            id="titulo"
                            onChange={(e) => setTitle(e.target.value)}
                            value={titulo}
                            required

                        />
                        
                        <label htmlFor="descrPubl">
                            Descripcion:

                        </label>
                        <input
                            type="text"
                            id="descrPubl"
                            onChange={(e) => setDescrPubl(e.target.value)}
                            value={descrPubl}
                            required

                        />

                        <br/>


                       
                        <label htmlFor="precio">
                            Precio por noche:

                        </label>
                        <input
                            type="text"
                            id="precio"
                            onChange={(e) => setPrecio(e.target.value)}
                            value={precio}
                            required

                        />

                        <br />

                        <h3>Ingrese los datos de la propiedad</h3>

                        <label htmlFor="direccion">
                            Direccion:

                        </label>
                        <input
                            type="text"
                            id="direccion"
                            onChange={(e) => setDireccion(e.target.value)}
                            value={direccion}
                            required

                        />

                        <label htmlFor="provincia">
                            Provincia:

                        </label>
                        <input
                            type="text"
                            id="provincia"
                            onChange={(e) => setProvincia(e.target.value)}
                            value={provincia}
                            required

                        />


                        <label htmlFor="localidad">
                            Localidad:

                        </label>
                        <input
                            type="text"
                            id="localidad"
                            onChange={(e) => setLocalidad(e.target.value)}
                            value={localidad}
                            required

                        />

                        <label htmlFor="pais">
                            Pais:

                        </label>
                        <input
                            type="text"
                            id="pais"
                            onChange={(e) => setPais(e.target.value)}
                            value={pais}
                            required

                        />
                        <br />

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Baños</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={banios}
                                    label="Baños"
                                    onChange={(e) => setBanios(e.target.value)}
                                >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <br />

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Habitaciones</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={habitaciones}
                                    label="Habitaciones"
                                    onChange={(e) => setHabitaciones(e.target.value)}
                                >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <br />


                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Personas</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={personas}
                                    label="Habitaciones"
                                    onChange={(e) => setPersonas(e.target.value)}
                                >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <label htmlFor="descrProp">
                            Descripcion:

                        </label>
                        <input
                            type="text"
                            id="descrProp"
                            onChange={(e) => setDescrProp(e.target.value)}
                            value={descrProp}
                            required

                        />

                        <br/>


                        <Button variant="contained" type="submit" color="primary">Crear publicación</Button>
                    </form>
                </Paper>
            )}
        </>
    )
}

export default MakePublication

