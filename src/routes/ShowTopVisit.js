import Logo from '../components/Logo';
import { useNavigate, Link } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import '../Recomendation.module.css';
import Slider from '../components/Slider';
import data from "../dataRecomendation";
import Stack from '@mui/material/Stack';
import ShowsAllPublications from "./ShowTopRecomendation";
import { Button } from "@mui/material";


import axios from '../api/axios';
import CardPublication from "../components/CardPublication";
import { Box, CircularProgress, Typography } from '@mui/material';

import { Add } from '@mui/icons-material';
const images = require.context('../images/')








const ShowTopVisit = () => {
    const [filters, setFilters] = useState(null);
    let username;
    if (!window.localStorage.getItem("username")) {
        window.location.href = "/login";
        return;
    } else {
        username = window.localStorage.getItem("username")
    }
    
   
       


    return (
        <div className={['contenedor-recomendaciones']} >
            <div className={['transparencia']}>
            
            

         

            <div className={['ultimas-visitas']}>
            
                <h8>Te recomendamos que reserves</h8>
                <Stack className='stack-recomendations' >
                    <ShowsAllPublications filters={filters}/>
                </Stack>
            
                
                
            </div>

            </div>

        </div>
    )

}

export default ShowTopVisit
