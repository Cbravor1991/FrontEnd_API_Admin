import { useState } from "react";
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";
import {Button, CircularProgress, Divider, Paper, Typography} from '@mui/material';
import { DateRange } from "@mui/icons-material";
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import swal from "sweetalert2";


//const PROPERTYHANDLER_URL = '/updateProperty/';


const DateReservation = () => {


    let public_id = window.localStorage.getItem("information_reservation")
    
    
    console.log(public_id);
   

    const navigate = useNavigate();

    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    //const [fechaInicio, setFechaInicio] = useState("");
    //const [fechaFin, setFechaFin] = useState("");
    
    let username;
    if (!window.localStorage.getItem("username")) {
        console.log("no autorizado")
        navigate("/login");
    } else {
        username = window.localStorage.getItem("username")
    }


    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack floors
           const paid = false
            
           const response = axios.post('/getReservedDaysByDateRange',
                JSON.stringify({
                    "start_date": format(fechaInicio, "yyyy-MM-dd"),"end_date": format(fechaFin, "yyyy-MM-dd"),
                    "email_user": username, 'publication_id': public_id, "paid": paid
                }),
                {
                    headers: { 'Content-Type': 'application/json'
                     }
                }

            ).then((response) => {
                console.log(response.data)
                if(((response.data).length)>0 ){
                    console.log("entro")
                    swal.fire({title: "SUS FECHAS RESERVADAS ON LAS SIGUIENTE", text:`${response.data}`, icon: "success"})

                }else { swal.fire({title: "ESTA PROPIEDAD NO TIENE RESERVAS", text:``, icon: "error"})}




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
  

    return ( 


<Paper component="form" onSubmit={handleSubmit} sx={{minWidth: 350, maxWidth: 600, padding: "20px", minHeight: 300, backgroundColor: 'white'}}> 
            
                    <Typography variant="h6"> Consultar fechas de Reservas </Typography>

                    <Divider></Divider>
                    <br></br>
                    
                        <label htmlFor="fechaInicio"><Typography variant="subtitle2" gutterBottom><DateRange></DateRange> Fecha inicio:  </Typography></label>
                        <DatePicker
                        selected={fechaInicio}
                        onChange={(date) => setFechaInicio(date)}
                        selectsStart
                        startDate={fechaInicio}
                        endDate={fechaFin}
                        name="fechaInicio"
                        id="fechaInicio"
                        
                        />
                    
                    <label htmlFor="fechaFin"><DateRange></DateRange> Fecha fin: </label>
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

                    <Button disabled={(fechaInicio > fechaFin)} variant="contained" type="submit"> Consultar</Button>
                    
                    
                    
                   
            </Paper>
    )
}

export default DateReservation

