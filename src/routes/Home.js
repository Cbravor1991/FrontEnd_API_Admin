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
    const [email_user, setEmailUser] = useState("");
    const [precioMin, setPrecioMin] = useState([0, 10000]);
    const [precioMax, setPrecioMax] = useState([0, 10000]);
    const [personas, setPersonas] = useState([0, 100]);
    const [rating, setRating] = useState([0, 5]);
    const [pais, setPais] = useState("");
    const [provincia, setProvincia] = useState("");
    const [localidad, setLocalidad] = useState("");

    let username;
    if (!window.localStorage.getItem("username")) {
        window.location.href = "/login";
        return;
    } else {
        username = window.localStorage.getItem("username")
    }

    //const { setAuth } = useContext(AuthContext);

    
    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        //setAuth({});
        window.localStorage.removeItem("username")

        navigate('/linkpage');
    }
    
    window.localStorage.setItem("reservado", false)
    
    window.localStorage.setItem("filters", 0);

    const handlePrecio = (event, newValue) => {
        setPrecioMin(newValue);
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
    
    const setFilters = async (event) => {
       //event.preventDefault();
       setEmailUser(username);
       const json = { "email_user": email_user,
                    "price_max": precioMax,
                    "price_min": precioMin,
                       "rating": rating,
                       "people": personas,
                      "country": pais,
                     "province": provincia,
                     "location": localidad
                   };
       window.localStorage.setItem("filters", json);
    }
    
   

    return (


        <ThemeProvider theme={theme}>
            <Stack direction="row" spacing={10} sx={{mt:10}}> 
                <Stack direction="column" spacing={3} sx={{flex:1 , ml: '3%', heigth: '100%', textAlign: 'left', justifyContent: 'space-between'}}>
                    
                    <DropDownMenuCountry setPais={setPais}/>
                    <DropDownMenuProvince setProvincia={setProvincia}/>
                    <DropDownMenuLocation setLocalidad={setLocalidad}/>
                    <Typography color="black">
                        Precio por día
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Precio'}
                        value={precioMax}
                        onChange={handlePrecio}
                        valueLabelDisplay="auto"
                        getAriaValueText={preciotext}
                        disableSwap
                    />
                    <Typography color="black">
                        Capacidad
                    </Typography>
                    <Slider
                        getAriaLabel={() => "Personas"}
                        defaultValue={3}
                        getAriaValueText={personastext}
                        valueLabelDisplay="auto"
                        value={personas}
                        onChange={handlePersonasChange}
                        step={1}
                        marks
                        min={1}
                        max={10}
                        disableSwap
                    />
                    <Typography color="black">
                        Rating
                    </Typography>
                    <Slider
                        getAriaLabel={() => "Rating"}
                        defaultValue={3}
                        getAriaValueText={ratingtext}
                        valueLabelDisplay="auto"
                        value={rating}
                        onChange={handleRatingChange}
                        step={1}
                        marks
                        min={1}
                        max={10}
                        disableSwap
                    />
                    
                   <br />
                        
                   <Button variant="contained" color="primary" onClick={() => {setFilters()}}>Filtrar</Button>
                    
                </Stack>
                
                <Divider orientation="vertical" flexItem />
                
                <Stack direction="column" sx={{width: '75vw'}}>
                    <ShowsAllPublications/>

                </Stack>
            </Stack>
        </ThemeProvider>
    )

}



export default Home

