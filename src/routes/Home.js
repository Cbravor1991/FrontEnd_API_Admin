import { Link } from "react-router-dom";
import Logo from '../components/Logo';
import { Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();

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

    return (
        <Paper className="custom" elevation={3} style={{ backgroundColor: 'grey', padding: '40px' }} >
            <p>Home</p>
            <br />
            <Logo />
            <p>Estas logueado como {username}</p>
            <br />
            <Link to="/showsMyPublications">Mis publicaciones</Link>
            <br />
            <Link to="/showsMyReservations">Mis reservas</Link>
            <br />
            <Link to="/admin">Ir a seccion casero </Link>
            <br />
            <Link to="/linkpage">Ir a la seccion de enlaces</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </Paper>)

}

export default Home
