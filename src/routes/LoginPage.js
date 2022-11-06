import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Logo from '../components/Logo';


const LOGIN_URL = '/user/login';

const LoginPage = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ 'email': user, 'password': pwd }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(JSON.stringify(response));
            //const accessToken = response?.data?.accessToken;
            //const roles = response?.data?.roles;
            //setAuth({ user, pwd, roles, accessToken });

            window.localStorage.setItem("username", user)
            //navigate(from, { replace: true });
            window.location.href = from;
        } catch (err) {
            if (!err?.response) {
                setErrMsg('El servidor no responde');
            } else if (err.response?.status === 401) {
                setErrMsg('Contraseña o usuario incorrecto');
            } else if (err.response?.status === 402) {
                setErrMsg('No tiene autorización');
            } else {
                setErrMsg('El ingreso ha fallado');
            }
            errRef.current.focus();
        }
    }

    return (

        <section style={{backgroundColor: 'grey'}}>
           
            <Logo />
            
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Ingresar</h1>
            <form className="custom" onSubmit={handleSubmit}>
                <label htmlFor="username">Nombre de usuario:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Ingresar</button>
            </form>
            <p>
                Necesitas una cuenta?<br />
                <span className="line">
                    <Link to="/register">Registrate</Link>
                </span>
            </p>
        </section>

    )
}

export default LoginPage
