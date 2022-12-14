import { useRef, useState} from "react"
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";
import Logo from '../components/Logo';
import { TextField } from '@mui/material';
import ReactStars from "react-rating-stars-component";



const Review = () => {


    let props = window.localStorage.getItem("view_publication")
    let parse_publication = (JSON.parse(props)).Publication
    
    //console.log(props)

    
    const refs = useRef();
    const [errMsg, setErrMsg] = useState();
    const [errRef, setErrRef] = useState();
    const [success, setSuccess] = useState(false);    
    const [rating, setRating] = useState(0);
    const [descripcion, setDescripcion] = useState();
    
    const [id_publication, setPublicationID] = useState(parse_publication.id);
    const [email_user, setEmail] = useState();
   
    
    const navigate = useNavigate();
    
   // const [activeStar, setActiveStar] = useState(-1);
   // const totalStars = 5;
   // const activeStars = 3;

    
    
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

        try {
            setEmail(username)
            console.log(username)
        
            const params = new URLSearchParams([['publication_id', id_publication]]);
            
            const headers = { 'Content-Type': 'application/json' }
            
            const json = JSON.stringify({
                    "email_user": username, 'rating': rating, 'description': descripcion
                })
                
            //const endpoint = '/newReview/' 
            const endpoint = (`/newReview/${id_publication}`)
                
            console.log(id_publication)
            console.log(rating)
            console.log(descripcion)    
            
            const response = axios({method: 'put', url: endpoint, data: json,
                
                    headers: headers });
              
             

            setSuccess(true);


        } catch (err) {
            if (!err?.response) {
                setErrMsg('No hay respuesta del servidor');
            } else if (err.response?.status === 400) {
                setErrMsg('error del tipo 400');
            } else {
                setErrMsg('el registro fallo')
            }
            errRef.current.focus();

            setErrMsg(null)
        }
    }
    

    return ( 

           
        <>
            {success ? (
                <section style={{ backgroundColor: 'grey' }}>
                    <h1>Gracias por su calificaci??n</h1>
                    <p>
                        <a href="/">Ir a la pagina principal</a>
                        <br />
                        <a href="/showsAllPublications">Ir a la pagina de publicaciones</a>
                    </p>
                </section>
            ) : (

                <section style={{ backgroundColor: 'grey' }}>
                    <Logo />
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2>Por favor ingrese su calificaci??n</h2>
                    <form className="custom" onSubmit={handleSubmit}>

                      < br/>
            
                       
            
              <ReactStars
               count={5}
               value={rating}
               onChange={(rating) => {setRating(parseInt(rating))}}
               size={35}
               isHalf={false}
               color='black'
              activeColor="#ffd700"
             />
  
      
               <label htmlFor="comentarios">
                            Comentarios:

                        </label>
                        <input
                            type="text"
                            id="comentarios"
                            onChange={(e) => setDescripcion(e.target.value)}
                            value={descripcion}
                            required

                        />


                        <button > Aceptar </button>                       
                    </form>
                </section>
            )}
        </>
    )
}

export default Review

