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
            <div className={['move']}>
                <h8>Top destinos más buscados en Argentina </h8>
            </div>
                
            <div className={['slider']}>
                

                <div className="mar-del-plata">
                    <h7>{data[0].Location}</h7>
                    
                
                    <img src={images(`./${data[0].coverImg}`)} className="card--image-mar-del" />
                    
                    
                </div>

                <div className="bariloche">
                    <h7>{data[1].Location}</h7>
                    <img src={images(`./${data[1].coverImg}`)} className="card-bariloche" />
                </div>

                <div className="cordoba">
                    <h7>{data[2].Location}</h7>
                    <img src={images(`./${data[2].coverImg}`)} className="card-cordoba" />
                </div>

                <div className="san-martin-de-los-andes">
                    <h7>{data[3].Location}</h7>
                    <img src={images(`./${data[3].coverImg}`)} className="card-san-martin-los-andes" />
                </div>



            </div>
            </div>

            <div className={['ultimas-visitas']}>
                
            </div>

        </div>
    )

}

export default Recomendation
