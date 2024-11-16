import "./DrawingPage.css"
import check from "../../../assets/icons/check.png"
import brush from "../../../assets/icons/brush.png"
import eraser from "../../../assets/icons/eraser.png"
import trash from "../../../assets/icons/trash.png"

const DrawingPage = ({ texto }) => {
    return (
        <div className="drawingpage">
            <div className="drawingpage_container">
                <p className="arrangetext">{texto}texto da história</p>



            </div>

            <button className="btn-enter"> <img src={check} alt="Confirm" /> </button>
            <div className="buttons">
                <button className="btn-brush"> <img src={brush} alt="Confirm" /> </button>
                <button className="btn-eraser"> <img src={eraser} alt="Confirm" /> </button>
                <button className="btn-trash"> <img src={trash} alt="Confirm" /> </button>
            </div>

        </div>
    )
}

export default DrawingPage