import "./EnterRoom.css"
import check from "../../../assets/icons/check.png"

const EnterRoom = () => {
    return (
        <div className="enterroom_page">
            <div className="enterroom_container">
                <input type="text" className="enterroom_input" placeholder="ID da Sala" />
            </div>
            <button className="check_button"> <img src={check} alt="Confirm" /> </button>
        </div>
    )
}

export default EnterRoom