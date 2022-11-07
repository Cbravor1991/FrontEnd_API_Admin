import { useState } from "react";
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CircularProgress } from "@mui/material";



const ViewPublication = (() => {

  //const { routeParams } = useParams();
  let props = window.localStorage.getItem("view_publication")
  let parse_publication = (JSON.parse(props)).Publication
  let parse_properties = JSON.parse(props).Property
  
  console.log(parse_publication);
  console.log(parse_properties);

  const navigate = useNavigate();

  const [publicationData, setPublicationData] = useState([]);

  let username = window.localStorage.getItem("username")
    
  
  const loadPublicationData = () => {
    if (!username){
      window.location.href = "/login";
      return;
    } 
    const params = new URLSearchParams([['offset', 0], ['limit', 100]]);
    const json = {"email_user": username}
    const headers = {headers:{
                     'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }}
                
    const routeParams = new URLSearchParams(window.location.search);
    //const id = routeParams.get('id'); 
    const id = parse_publication.id;
    console.log(id) 
              
    
    axios.post('/publications/', json, params, headers)
    .then((response) => {
      console.log(response.data)
      let item = response.data.filter(x => x.Publication.id === id)[0];
      console.log(item);
      setPublicationData(publicationData.push(item));
      console.log(publicationData)
      //console.log(id)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  

  //if (!publicationData){
    loadPublicationData();
  //}
    
  const [images, setImages] = useState(null);

  const loadImages = (publicationData) => {
      if (!username){
        console.log("no autorizado")
        //navigate("/login");
        window.location.href = "/login";
        return;
      } 
      console.log(publicationData);
      //let parse = JSON.parse(publicationData).Property;
      //console.log(parse);
      const params = new URLSearchParams([['property_id', parse_properties.id]]);
    
      axios.post('/fetchAllPropertyImages/', {},{ params })
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
   }


    //if (publicationData && !images){
      loadImages(publicationData);
    //}

   const makeReservation = async (props) => {
     window.localStorage.setItem("make_reservation", props)
     window.location.href="/makeReservation/"
    }
    
    const calificar = async (props) => {
     window.localStorage.setItem("calificar", JSON.stringify (props))
     window.location.href="/review/"
    }



    return (
                <section style={{ backgroundColor: 'grey' }}>
                
                  {(publicationData && images) ? <>
                  
                    <h2>Datos de la publicación</h2>

                    <Typography sx={{ fontSize: 34 }} color="text.secondary" gutterBottom>
                        {parse_publication.title}
                    </Typography>

                    <div className="form-group multi-preview">
                      {(images || []).map(image => (
                          <img src={image.link} alt='preview' height="200"/>
                      ))}
                    </div>

                    <Typography variant="h6" component="div">
                        {parse_properties.description}
                    </Typography>

                    <Typography variant="body2">
                      $ {parse_publication.price}
                    </Typography>

                    <Typography variant="body2">
                      {parse_properties.direction}
                    </Typography>

                    <Typography variant="body2">
                      {parse_properties.province}
                    </Typography>
                      
                    <Typography variant="body2">
                      {parse_properties.location}
                    </Typography>
                      
                    <Typography variant="body2">
                      {parse_properties.country}
                    </Typography>
                      
                    <Typography variant="body2">
                      {parse_properties.toilets} baños
                    </Typography>
                      
                    <Typography variant="body2">
                      {parse_properties.rooms} habitaciones
                    </Typography>
                      
                    <Typography variant="body2">
                      para {parse_properties.people} personas
                    </Typography>
                      
                    <Typography variant="body2">
                      {parse_publication.description}
                    </Typography>
                    
                    <Typography variant="body2">
                      Puntaje promedio: {parse_publication.rating}
                    </Typography>
                    
                    <Button variant="contained" onClick={()=>{makeReservation(props)}}
                    disabled={false} color="success">Realizar reserva</Button>
                    
                    <Button variant="contained" onClick={()=>{calificar(props)}} 
                    disabled={true} color="success">Calificar</Button>
                      
                    <Button variant="filled" color="primary" 
                    onClick={() => {navigate(-1);return false;}}>Volver</Button>
                    
                  </> :
                  <CircularProgress></CircularProgress>}

                </section>
    )
})

export default ViewPublication
