import "./infogiver.css"
import check from "../../assets/icons/check.png"


const InfoGiver = ({ text, role, url }) => {
  const handleClick = () => {
    window.location.href = url
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