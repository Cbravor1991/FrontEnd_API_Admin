import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import {  Typography } from '@mui/material';

import Stack from '@mui/material/Stack';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import Divider from "@mui/material/Divider";
import Slider from '@mui/material/Slider';
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

    const navigate = useNavigate();
    const [precio, setPrecio] = useState([0, 10000]);
    const [metrosCuadrados, setMetrosCuadrados] = useState([0, 100]);
    const [baños, setBaños] = useState([1, 10]);
    const [habitaciones, setHabitaciones] = useState([1, 10]);
    const [provincia, setProvincia] = useState("");

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

    const handlePrecio = (event, newValue) => {
        setPrecio(newValue);
    };
    const handleMetrosCuadradosChange = (event, newValue) => {
        setMetrosCuadrados(newValue);
    };

    const handleBañosChange = (event, newValue) => {
        setBaños(newValue);
    };
    const handleHabitacionesChange = (event, newValue) => {
        setHabitaciones(newValue);
    };

    function preciotext(value) {
        return `${value}$`;
    }
    function metrosCuadradostext(value) {
        return `${value}m²`;
    }
    function bañostext(value) {
        return `${value} baños`;
    }
    function habitacionestext(value) {
        return `${value} habitaciones`;
    }
    return (


        <ThemeProvider theme={theme}>
            <Stack direction="row" spacing={10} sx={{mt:10}}> 
                <Stack direction="column" spacing={3} sx={{flex:1 , ml: '3%', heigth: '100%', textAlign: 'left', justifyContent: 'space-between'}}>
                    <DropDownMenuLocation setProvincia={setProvincia}/>
                    <Typography color="black">
                        Precio por día
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Precio'}
                        value={precio}
                        onChange={handlePrecio}
                        valueLabelDisplay="auto"
                        getAriaValueText={preciotext}
                        disableSwap
                    />
                    <Typography color="black">
                        Habitaciones
                    </Typography>
                    <Slider
                        getAriaLabel={() => "Habitaciones"}
                        defaultValue={3}
                        getAriaValueText={habitacionestext}
                        valueLabelDisplay="auto"
                        value={habitaciones}
                        onChange={handleHabitacionesChange}
                        step={1}
                        marks
                        min={1}
                        max={10}
                        disableSwap
                    />
                    <Typography color="black">
                        Baños
                    </Typography>
                    <Slider
                        getAriaLabel={() => "Baños"}
                        defaultValue={1}
                        getAriaValueText={bañostext}
                        valueLabelDisplay="auto"
                        value={baños}
                        onChange={handleBañosChange}
                        step={1}
                        marks
                        min={1}
                        max={10}
                        disableSwap
                    />                    
                    <Typography color="black">
                        Metros cuadrados
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Metros cuadrados'}
                        value={metrosCuadrados}
                        onChange={handleMetrosCuadradosChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={metrosCuadradostext}
                        disableSwap
                    />                    
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




{/* 
<Link to="/showsMyReservations">Mis reservas</Link>
*/}

