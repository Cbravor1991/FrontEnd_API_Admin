import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from '../api/axios';
import CardPublication from "../components/CardPublication";
import { Box, CircularProgress, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from "@mui/material";


const ShowsAllPublications = () => {

  const [publications, setPublications] = useState(null);

  let username = window.localStorage.getItem("username")
  
  
    //const [email_user, setEmail] = useState('');
    const [precioMin, setPrecioMin] = useState(null);
    const [precioMax, setPrecioMax] = useState(null);
    const [localidad, setLocalidad] = useState("");
    const [provincia, setProvincia] = useState("");
    const [pais, setPais] = useState("");
    const [rating, setRating] = useState(null);
    const [personas, setPersonas] = useState(null);
  
  
  const loadPublications = () => {
    if (!username){
      window.location.href = "/login";
      return;
    } 
    const params = new URLSearchParams([['offset', 0], ['limit', 100]]);
    const json = { "email_user": username,
                    "price_max": precioMax,
                    "price_min": precioMin,
                       "rating": rating,
                       "people": personas,
                      "country": pais,
                     "province": provincia,
                     "location": localidad
                   }
    
    
       
    const headers = {headers:{
                     'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }}
    axios({method:'post', url:'/publications/', data:json, params:params, headers:headers })
    .then((response) => {
      setPublications(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    loadPublications();
    }, []);




  return (
                                              
                        <>
                        
                      <form className="custom" onSubmit={loadPublications}>
                        
                         <label htmlFor="filtros">
                            Filtros
                        </label>
                        
                         <label htmlFor="precioMin">
                            Precio mínimo:
                        </label>
                        <input
                            type="text"
                            id="precioMin"
                            onChange={(e) => setPrecioMin(e.target.value)}
                            value={precioMin}
                        />

                        
                        <label htmlFor="precioMax">
                            Precio máximo:
                        </label>
                        
                        <input
                            type="text"
                            id="precioMax"
                            onChange={(e) => setPrecioMax(e.target.value)}
                            value={precioMax}
                        />

                                                
                        <label htmlFor="provincia">
                            Provincia:
                        </label>
                        
                        <input
                            type="text"
                            id="provincia"
                            onChange={(e) => setProvincia(e.target.value)}
                            value={provincia}
                        />
                        

                        <label htmlFor="localidad">
                            Localidad:
                        </label>
                        
                        <input
                            type="text"
                            id="localidad"
                            onChange={(e) => setLocalidad(e.target.value)}
                            value={localidad}
                        />
                        

                        <label htmlFor="pais">
                            Pais:
                        </label>
                        
                        <input
                            type="text"
                            id="pais"
                            onChange={(e) => setPais(e.target.value)}
                            value={pais}
                        />
                        

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={rating}
                                    label="Rating"
                                    onChange={(e) => setRating(e.target.value)}
                                >
                                    <MenuItem value={null}></MenuItem>
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>


                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Personas</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={personas}
                                    label="Personas"
                                    onChange={(e) => setPersonas(e.target.value)}
                                >
                                    <MenuItem value={null}></MenuItem>
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
                        
                        <Button variant="contained" type="submit" color="primary">Buscar</Button>
                        
                      </form>
                        
                      <br />
                        
            
    {
                    
    
    
      publications ? (
      publications.length > 0 ?  
      
        
      
      
      <Box sx={{display:'flex',flexWrap: 'wrap' }}>
        {
        
        publications.map(item => {
          return (
              <CardPublication key={item.Publication.id} {...item} username={username} updatePublications={loadPublications} />
          )}
        )}   
      </Box>
      
      
      : (<><Typography style={{color: "black"}} variant="h6" gutterBottom>
          No hay publicaciones realizadas.
      </Typography>

      <Typography style={{color: "black"}} variant="body2" gutterBottom>
            Podes realizar tu publicacion en <Link to="/ShowsMyPublications"> Mis publicaciones </Link>
      </Typography></>)
    )
    
    : <CircularProgress></CircularProgress>
    }
    
       
    </>
  
  )
}

export default ShowsAllPublications
