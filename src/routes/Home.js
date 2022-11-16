import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {  Typography } from '@mui/material';
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, Paper } from '@mui/material';
import Divider from "@mui/material/Divider";
import Slider from '@mui/material/Slider';
import DropDownMenuCountry from '../components/DropDownMenuCountry';
import DropDownMenuProvince from '../components/DropDownMenuProvince';
import DropDownMenuLocation from '../components/DropDownMenuLocation';
import ShowsAllPublications from "./ShowsAllPublications";


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


const Home = () => {

    useEffect(() => {
      setFilters();
    }, []);


    const navigate = useNavigate();
    const [precioMin, setPrecioMin] = useState(null);
    const [precioMax, setPrecioMax] = useState(null);
    const [personas, setPersonas] = useState(null);
    const [rating, setRating] = useState(null);
    const [pais, setPais] = useState("");
    const [provincia, setProvincia] = useState(null);
    const [localidad, setLocalidad] = useState(null);

    const [filters, setFilters] = useState(null);


    let username;
    if (!window.localStorage.getItem("username")) {
        window.location.href = "/login";
        return;
    } else {
        username = window.localStorage.getItem("username")
    }
        

    const handlePrecioMin = (event, newValue) => {
        setPrecioMin(newValue);
    };

    const handlePrecioMax = (event, newValue) => {
        setPrecioMax(newValue);
    };
    const handlePersonasChange = (event, newValue) => {
        setPersonas(newValue);
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    function preciotext(value) {
        return `$ ${value}`;
    }
    
    function personastext(value) {
        return `${value} personas`;
    }
    
    function ratingtext(value) {
        return `rating ${value}`;
    }
    
    const onFiltrarClick = (event) => {
        event.preventDefault();
       const json = JSON.stringify({
                    "price_max": precioMax,
                    "price_min": precioMin,
                       "rating": rating,
                       "people": personas,
                      "country": pais,
                     "province": provincia,
                     "location": localidad
                   });
                   
       setFilters(json);
       console.log(filters);
       
       //let filters = window.localStorage.getItem("filters");
       //console.log(filters);
    }
    
   

    return (


        <ThemeProvider theme={theme}>
            <Stack direction="row" spacing={10} sx={{mt:10}}> 
                <Stack direction="column" spacing={3} sx={{flex:1 , ml: '3%', heigth: '100%', textAlign: 'left', justifyContent: 'space-between'}}>
                    
                    <DropDownMenuCountry setPais={setPais}/>
                    <DropDownMenuProvince setProvincia={setProvincia}/>
                    <DropDownMenuLocation setLocalidad={setLocalidad}/>
                    
                    <Typography color="black">
                        Precio noche min
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'PrecioMinimo'}
                        defaultValue={0}
                        onChange={handlePrecioMin}
                        valueLabelDisplay="auto"
                        getAriaValueText={preciotext}
                        step={1000}
                        min={0}
                        max={10000}
                        disableSwap
                    />

                    <Typography color="black">
                        Precio noche máx
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'PrecioMaximo'}
                        defaultValue={5000}
                        onChange={handlePrecioMax}
                        valueLabelDisplay="auto"
                        getAriaValueText={preciotext}
                        step={1000}
                        min={0}
                        max={50000}
                        disableSwap
                    />
                    <Typography color="black">
                        Capacidad
                    </Typography>
                    <Slider
                        getAriaLabel={() => "Personas"}
                        defaultValue={6}
                        getAriaValueText={personastext}
                        valueLabelDisplay="auto"
                        onChange={handlePersonasChange}
                        step={1}
                        marks
                        min={0}
                        max={10}
                        disableSwap
                    />
                    <Typography color="black">
                        Rating
                    </Typography>
                    <Slider
                        getAriaLabel={() => "Rating"}
                        defaultValue={null}
                        getAriaValueText={ratingtext}
                        valueLabelDisplay="auto"
                        onChange={handleRatingChange}
                        step={1}
                        marks
                        min={0}
                        max={5}
                        disableSwap
                    />
                    
                   <br />
                        
                   <Button variant="contained" color="primary" onClick={(e) => {onFiltrarClick(e)}}>Filtrar</Button>
                    
                </Stack>
                
                <Divider orientation="vertical" flexItem />
                
                <Stack direction="column" sx={{width: '75vw'}}>
                    <ShowsAllPublications filters={filters}/>
                </Stack>
            </Stack>
        </ThemeProvider>
    )

}



export default Home