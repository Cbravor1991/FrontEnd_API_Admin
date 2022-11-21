import Logo from '../components/Logo';
import { useNavigate, Link } from "react-router-dom";
import '../Recomendation.module.css';
import Slider from '../components/Slider';
import data from "../dataRecomendation";
const images = require.context('../images/')



const Recomendation = () => {




    return (
        <div className={['contenedor-recomendaciones']} >
            <div className={['transparencia']}>
            <div className={['slider']}>

                <div className="mar-del-plata">
                    <img src={images(`./${data[0].coverImg}`)} className="card--image-mar-del" />
                </div>

                <div className="bariloche">
                    <img src={images(`./${data[1].coverImg}`)} className="card-bariloche" />
                </div>

                <div className="cordoba">
                    <img src={images(`./${data[2].coverImg}`)} className="card-cordoba" />
                </div>

                <div className="san-martin-de-los-andes">
                    <img src={images(`./${data[3].coverImg}`)} className="card-san-martin-los-andes" />
                </div>



            </div>
            </div>

        </div>
    )

}

export default Recomendation
