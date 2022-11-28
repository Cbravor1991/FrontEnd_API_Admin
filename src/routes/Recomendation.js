import Logo from '../components/Logo';
import { useNavigate, Link } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import '../Recomendation.module.css';
import Slider from '../components/Slider';
import data from "../dataRecomendation";
import Stack from '@mui/material/Stack';
import ShowsAllPublications from "./ShowsMyRecomendation";
import { Button } from "@mui/material";


import axios from '../api/axios';
import CardPublication from "../components/CardPublication";
import { Box, CircularProgress, Typography } from '@mui/material';

import { Add } from '@mui/icons-material';
const images = require.context('../images/')








const Recomendation = () => {
    const [filters, setFilters] = useState(null);
    let username;
    if (!window.localStorage.getItem("username")) {
        window.location.href = "/login";
        return;
    } else {
        username = window.localStorage.getItem("username")
    }

    const preferences = (visit) => {
        console.log('entro')
        window.localStorage.setItem("top_visit", visit)
        window.location.href="/showTopVisit"

     
      }
   

   
       


    return (
        <div className={['contenedor-recomendaciones']} >
            <div className={['transparencia']}>
            <div className={['move']}>
                <h8>Top destinos más buscados en Argentina </h8>
            </div>
                
            <div className={['slider']}>
                

                <div className="mar-del-plata">
                <Button variant="contained" style={{backgroundColor: "#e67e22"}} onClick={()=>{preferences(data[0].Location)}} >{data[0].Location}</Button>
                     <img src={images(`./${data[0].coverImg}`)} className="card--image-mar-del" />
                    
                    
                </div>

                <div className="bariloche">
                    <Button variant="contained"  style={{backgroundColor: "#e67e22"}} onClick={()=>{preferences(data[1].Location)}} >{data[1].Location}</Button>
                    <img src={images(`./${data[1].coverImg}`)} className="card-bariloche" />
                </div>

                <div className="cordoba">
                    <Button variant="contained" style={{backgroundColor: "#e67e22"}} onClick={()=>{preferences(data[2].Location)}}>{data[2].Location}</Button>
                    <img src={images(`./${data[2].coverImg}`)} className="card-cordoba" />
                </div>

                <div className="san-martin-de-los-andes">
                    <Button variant="contained" style={{backgroundColor: "#e67e22"}} onClick={()=>{preferences(data[3].Location)}} >{data[3].Location}</Button>
                    <img src={images(`./${data[3].coverImg}`)} className="card-san-martin-los-andes" />
                </div>

        

            </div>
            </div>

         

            <div className={['ultimas-visitas']}>
            
                <h8>Te recomendamos que reserves</h8>
                <Stack className='stack-recomendations' >
                    <ShowsAllPublications filters={filters}/>
                </Stack>
            
                
                
            </div>

        </div>
    )

}

export default Recomendation
