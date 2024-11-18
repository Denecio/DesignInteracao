import "./infogiver.css"
import check from "../../assets/icons/check.png"
import { useNavigate } from 'react-router-dom';
import buttonsound from '../../assets/sounds/button.mp3';


const InfoGiver = ({ text, role, url }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    
    let ButtonSound = new Audio(buttonsound);
    ButtonSound.play().catch(error => {
      console.error("Error playing button sound:", error);
    });

     ButtonSound.addEventListener('ended', () => {
      navigate(url)
    });

    
  }

  return (
    <div className="infogiver_page">
      <div className="infogiver_container">
        <h2 className="infogiver_text">{text}</h2>
        <p className="infogiver_role">{role}</p>
      </div>
      <button className="check_button" onClick={handleClick}> <img src={check} alt="Confirm" /> </button>
    </div>
  )
}


export default InfoGiver