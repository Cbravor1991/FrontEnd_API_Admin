import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";


const FAQ = (() => {

  const navigate = useNavigate();

  return (
        <div>
        
          <Typography variant="subtitle2" style={{ fontWeight: "bold"}}  gutterBottom>
              PREGUNTAS FRECUENTES
          </Typography>
          <br/>
          
          <ListItemText
            primary="¿Aceptan mascotas?"
            secondary="Depende del tipo de propiedad y del anfitrión."
          />
          <br/>
          <ListItemText
            primary="¿Se puede pagar con débito?"
            secondary="Si, no hay problema."
          />
          <br/>
          <ListItemText
            primary="¿Puedo cancelar una reserva ya confirmada?"
            secondary="Si, se debe ingresar a Mis reservas y pulsar el botón Cancelar."
          />
          <br/>
          <ListItemText
            primary="¿Dónde puedo confirmar que pagué mi reserva?"
            secondary="Se debe ingresar a Mis reservas, donde se encuentra la información sobre la misma."
          />
          
          <br/> <br/>
          <Button variant="contained" color="primary" onClick={() => {navigate(-1);return false;}} fullWidth>Volver</Button>
        </div>
   )

})

export default FAQ
