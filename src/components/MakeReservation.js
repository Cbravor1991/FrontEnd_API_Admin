import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../components/Logo';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {Button, Divider, Paper, Typography} from '@mui/material';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router-dom'
import { DateRange, PrecisionManufacturing } from "@mui/icons-material";
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

import 'react-datepicker/dist/react-datepicker-cssmodules.css'

//import 'react-day-picker/dist/style.css';

//import subDays from "date-fsn/subDays";
import Moment from "moment";

import swal from "sweetalert2";

const PROPERTYHANDLER_URL = '/updateProperty/';


const MakeReservation = () => {


    let props = window.localStorage.getItem("view_publication")
    let parse_publication = (JSON.parse(props)).Publication
    
    //console.log(props)

    const userRef = useRef();
    const errRef = useRef();
    
    /*Este es el parametro id que recupero de props/*/


    /*Recomporner Json*/



    /*Datos publicacion*/
    
    const [id_publication, setPublicationID] = useState(parse_publication.id);
    const [email_user, setEmail] = useState('');
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    //const [fechaInicio, setFechaInicio] = useState("");
    //const [fechaFin, setFechaFin] = useState("");
    
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);    
    const [selected, setSelected] = useState('');
    const [selected1, setSelected1] = useState('');
    const navigate = useNavigate();
    
    
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

            setEmail(username)
        
        
            
            axios.post('/reserve',
                JSON.stringify({
                    "start_date": format(fechaInicio, "yyyy-MM-dd"),"end_date": format(fechaFin, "yyyy-MM-dd"),
                    "email_user": username, 'publication_id': id_publication
                }),
                {
                    headers: { 'Content-Type': 'application/json'
                     }
                }

            ).then(() => {
                swal.fire({title: "Exito", text:"Reserva realizada exitosamente", icon: "success"}).then(() => {navigate("/showsAllPublications")})
            }).catch((err) => {
                console.log(err);
                swal.fire({title: "Error", text:`Error realizando reserva: "${(err.response ? err.response.data.detail : err)}"`, icon: "error"})

            });
              
    }
    
  /*  useEffect((props) => {
      window.localStorage.setItem("keep_publication", JSON.stringify (props))
      
      props = window.localStorage.getItem("keep_publication")
      parse_publication = (JSON.parse(props)).Publication
      parse_properties = JSON.parse(props).Property
    })*/

    let footer = <p>Seleccione una fecha</p>
            if (selected) {
                footer = <p>Se seleccionó {format(selected, 'yyyy-MM-dd')}.</p>;
             }
             if (selected1) {
                footer = <p>Se seleccionó {format(selected1, 'yyyy-MM-dd')}.</p>;
             }
  

    return ( 


<Paper component="form" onSubmit={handleSubmit} sx={{minWidth: 350, maxWidth: 600, padding: "20px", minHeight: 300, backgroundColor: 'white'}}> 
                    <Typography variant="h6"> Ingrese los datos de la reserva </Typography>

                    <Divider></Divider>
                    <br></br>
                    
                    {/* <label htmlFor="titulo">
                        Fecha de ingreso:
                    </label>
                    
                    <br/>
                    
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        value={fechaInicio}
                        //mode="single"
                        //minDate={subDays(new Date(), 0)}
                        selected={fechaInicio}
                        onChange={(date: Date) => {setFechaInicio(date)}}
                        footer={footer}
                    />

                    <br/>
                    
                    <label htmlFor="descrPubl">
                        Fecha de egreso:
                    </label>
                    
                    <br/>
                    
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        value={fechaFin}
                        //mode="single"
                        selected={fechaFin}
                        onChange={(date: Date) => {setFechaFin(date)}}
                        footer={footer}
                    /> */}

                    
                        <label for="fechaInicio"><Typography variant="subtitle2" gutterBottom><DateRange></DateRange> Fecha inicio:  </Typography></label>
                        <DatePicker
                        selected={fechaInicio}
                        onChange={(date) => setFechaInicio(date)}
                        selectsStart
                        startDate={fechaInicio}
                        endDate={fechaFin}
                        name="fechaInicio"
                        id="fechaInicio"
                        />
                    
                    <label for="fechaFin"><DateRange></DateRange> Fecha fin: </label>
                    <DatePicker
                    selected={fechaFin}
                    onChange={(date) => setFechaFin(date)}
                    selectsEnd
                    startDate={fechaInicio}
                    endDate={fechaFin}
                    minDate={fechaInicio}
                    name="fechaFin"
                        id="fechaFin"
                    />

                    <br></br>
                    <br></br>

                    <Button variant="outlined" onClick={() => {navigate(-1)
                        }}> Volver </Button>

                    <Button variant="contained" type="submit"> Reservar</Button>
                    
                   
            </Paper>
    )
}

export default MakeReservation

