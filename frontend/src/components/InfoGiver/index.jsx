import "./infogiver.css"
import check from "../../assets/icons/check.png"
import { useNavigate } from 'react-router-dom';


const InfoGiver = ({ text, role, url }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(url)
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