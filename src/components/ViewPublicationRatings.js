import { useRef, useState, useEffect, useCallback, memo, useMemo } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from './Logo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router-dom'
import { LocationOn, LocationOnOutlined, PrecisionManufacturing, StarRate } from "@mui/icons-material";
//import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CircularProgress, Divider, Paper, Rating } from "@mui/material";



const ViewPublicationReviews = (() => {

  const routeParams = useParams();

  const navigate = useNavigate();

  const [publicationReviews, setPublicationReviews] = useState(null);

  let username = window.localStorage.getItem("username")
  
  const loadPublicationReviews = () => {
    if (!username){
      window.location.href = "/login";
      return;
    } 
    
    axios.get(`/reviews/${ routeParams.id}`, {},{  })
    .then((response) => {
      console.log(response.data)
      setPublicationReviews(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  if (!publicationReviews){
    loadPublicationReviews();
  }




    return (
    <Paper component="form" sx={{minWidth: 350, padding: "20px", backgroundColor: 'white', textAlign: "left"}}> 
                  {(publicationReviews) ? <>

                    {publicationReviews.map((x) => 
                    <div>
                      <Typography variant="subtitle1">
                      User id: {x.user_id}
                      </Typography> 
                      <Rating size="small" value={x.rating} readOnly={true}></Rating>
                      <Typography variant="subtitle2">
                      {x.description}
                      </Typography> 
                      <Divider style={{margin: "3px 0 3px 0"}}/> 
                      </div>)}
                    
                      
                    <Button variant="contained" color="primary" 
                    onClick={() => {navigate(-1);return false;}} fullWidth>Volver</Button>
                  </> :
                  <CircularProgress/>}

                </Paper>
    )
})

export default ViewPublicationReviews