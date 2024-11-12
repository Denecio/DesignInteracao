import "./DrawingPage.css"
import check from "../../../assets/icons/check.png"
import brush from "../../../assets/icons/brush.png"
import eraser from "../../../assets/icons/eraser.png"
import trash from "../../../assets/icons/trash.png"

const DrawingPage = () => {
    return(
        <div className="enterroom_container">
            <div className="container">
                <input type="text" className="input" placeholder="ID da Sala"/>
            </div>
            <button className="btn-enter"> <img src={check} alt="Confirm"/> </button>
        </div>
    )
}

export default DrawingPage