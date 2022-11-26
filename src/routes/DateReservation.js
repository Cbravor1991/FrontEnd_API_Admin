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
import { subDays } from "date-fns";



//const PROPERTYHANDLER_URL = '/updateProperty/';


const DateReservation = () => {


    let public_id = window.localStorage.getItem("information_reservation")
    
    
    console.log(public_id);
   

    const navigate = useNavigate();

    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [dates, setDates] = useState(null);
    //const [fechaInicio, setFechaInicio] = useState("");
    //const [fechaFin, setFechaFin] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    /*const [year, setYear] = useState("");
    const [show, setShow] = useState(false);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];*/
    
    
    
    let username;
    if (!window.localStorage.getItem("username")) {
        console.log("no autorizado")
        navigate("/login");
    } else {
        username = window.localStorage.getItem("username")
    }


    const loadDates = () => {
        //e.preventDefault();
        // if button enabled with JS hack floors
           const paid = false
            
           const response = axios.post('/getReservedDaysByDateRange',
                JSON.stringify({
                    "start_date": "2022-01-01","end_date": "2022-12-31",
                    'publication_id': public_id
                }),
                {
                    headers: { 'Content-Type': 'application/json'
                     }
                }

            ).then((response) => {
                console.log(response.data)
                if(((response.data).length)>0 ){
                    console.log("entro");
                    //swal.fire({title: "SUS FECHAS RESERVADAS ON LAS SIGUIENTE", text:`${response.data}`, icon: "success"})
                    setDates(response.data.map((x) => new Date(new Date(x).setDate(new Date(x).getDate() + 1)) ));
                }else { swal.fire({title: "ESTA PROPIEDAD NO TIENE RESERVAS", text:``, icon: "error"})}




            }).catch((err) => {
                console.log(err);
                swal.fire({title: "Error", text:`Error realizando reserva: "${(err.response ? err.response.data.detail : err)}"`, icon: "error"})

            });
              
    }
    
   if (!dates) {
     loadDates(); 
    }
   /*function generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = max - 9;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return years;
  }
  
  const years = generateArrayOfYears();*/

  
  //let highlight = dates.map(date => format((new Date(date)),"yyyy-MM-dd"));
  //console.log(highlight);
  
  return (
    <div className="white-box p-20">
      <DatePicker
                        onChange={(date) => setFechaInicio(date)}
                        startDate={fechaInicio}
                        endDate={fechaFin}
                        name="fechaInicio"
                        id="fechaInicio"
                        excludeDates={dates}
                        />
    </div>
  );
}

export default DateReservation

