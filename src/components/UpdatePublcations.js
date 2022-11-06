import { useRef, useState } from "react";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import Logo from '../components/Logo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//const PROPERTYHANDLER_URL = '/updateProperty/';

const UpdatePublications = () => {


    let props = window.localStorage.getItem("update_publication")
    let parse_publication = (JSON.parse(props)).Publication
    let parse_properties = JSON.parse(props).Property
    console.log(props)

    const userRef = useRef();
    const errRef = useRef();
    /*Este es el parametro id que recupero de props/*/


    /*Recomporner Json*/



    /*Datos publicacion*/
    const [id_property, setPropertyID] = useState(parse_properties.id);
    const [id_publication, setPublicationID] = useState(parse_publication.id);
    const [titulo, setTitle] = useState(parse_publication.title);
    const [descrPubl, setDescrPubl] = useState(parse_publication.description);
    const [email_user, setEmail] = useState(parse_publication.email_user);
    const [precio, setPrecio] = useState(parse_publication.price);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    
    const [direccion, setDireccion] = useState(parse_properties.direction);
    const [localidad, setLocalidad] = useState(parse_properties.location);
    const [provincia, setProvincia] = useState(parse_properties.province);
    const [pais, setPais] = useState(parse_properties.country);
    const [habitaciones, setHabitaciones] = useState(parse_properties.rooms);
    const [banios, setBanios] = useState(parse_properties.toilets);
    const [personas, setPersonas] = useState(parse_properties.people);
    const [descrProp, setDescrProp] = useState(parse_properties.description);


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
            
            const urls = [];
            //const links = [];
            
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
            //const params = new URLSearchParams();
            //params.append('property_id', id_property)

            const params = { publication_id: id_publication}

            const json = JSON.stringify({
                'title': titulo, 'description': descrPubl, 'price': precio, 'property_id': id_property, 'email_user': username
            })

            const headers = { 'Content-Type': 'application/json' }

            axios({
                method: 'put', url: '/updatePublication', data: json,
                params: params, headers: headers
            });

            const params_1 = { property_id: id_property}

            const json_1 = JSON.stringify({
                'direction': direccion,'province': provincia,  'location': localidad,
                'country': pais, 'toilets': banios, 'rooms':habitaciones, 'people': personas, 'description': descrProp, 'links': links, 'email_user': username}
            )

            

            axios({
                method: 'put', url: '/updateProperty', data: json_1,
                params: params_1, headers: headers
            });





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
                <section style={{ backgroundColor: 'grey' }}>
                    <h1>Propiedad actualizada con exito!</h1>
                    <p>
                        <a href="/">Ir a la pagina principal</a>
                        <br />
                        <a href="/showPublication">Ir a la pagina de publicaciones</a>
                    </p>
                </section>
            ) : (

                <section style={{ backgroundColor: 'grey' }}>
                    <Logo />
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2>Ingrese los datos de la publicación</h2>
                    <form className="custom" onSubmit={handleSubmit}>

                        <br />

                        <Link to="/fileLoaderGallery2">Cargar Fotos</Link>

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
                        
                        
                        <label htmlFor="descrProp">
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
                            Precio:
                        </label>
                        
                        <input
                            type="text"
                            id="precio"
                            onChange={(e) => setPrecio(e.target.value)}
                            value={precio}
                            required
                        />

                        <br />

                        <h2>Ingrese los datos de la propiedad</h2>

                        <br />
                        <Link to="/fileLoader">Cargar Fotos</Link>

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


                        <button >Actualizar Datos</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default UpdatePublications
