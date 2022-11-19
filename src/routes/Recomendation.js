import Logo from '../components/Logo';
import { useNavigate, Link } from "react-router-dom";
import '../Recomendation.module.css';
import Slider from '../components/Slider';
import data from "../dataRecomendation"



const Recomendation = () => {

    const slide = data.map(item=>{
        return (
            <Slider
            key ={item.id}
            {...item}
            />
        )


   })
    
   

    return (
          <div className={['contenedor-recomendaciones']} >
                <div className={['slider']}> 

                {slide}
                
                </div>
        
             </div>
        )

}

export default Recomendation
