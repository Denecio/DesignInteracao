import "./DrawingPage.css"
import check from "../../../assets/icons/check.png"
import brush from "../../../assets/icons/brush.png"
import eraser from "../../../assets/icons/eraser.png"
import trash from "../../../assets/icons/trash.png"
import { useState } from "react"

const DrawingPage = ({ texto }) => {
    const [openPopUp, setOpenPopUp] = useState(false)

    const handleClick = () => {
        navigate(`/ArrangeFrames/:id`);
    }

    return (
        <div className="drawingpage">
            <div className="drawingpage_container">
                <div className="buttons">
                    <button className="btn-brush"> <img src={brush} alt="Confirm" /> </button>
                    <button className="btn-eraser"> <img src={eraser} alt="Confirm" /> </button>
                    <button className="btn-trash"> <img src={trash} alt="Confirm" /> </button>
                </div>
                <div className="drawing">
                    <p className="arrangetext">{texto}texto da história</p>
                    <div className="canvas"></div>
                </div>
                <button className="btn-enter" onClick={() => setOpenPopUp(true)}> <img src={check} alt="Confirm" /></button>

                {
                    openPopUp &&
                    <div class="confirmPopUp">
                        <div>
                        <p className="aconfirmText">Tens a certeza que queres submeter?</p>
                        </div>
                        <div class="confirmBtns">
                        <button className="btn-enter" onClick={() => setOpenPopUp(false)}> <p>Cancelar</p> </button>
                        <button className="btn-enter" onClick={() => handleClick}><p>Confirmar</p> </button>
                        </div>
                    </div>
                }
            </div>

            

        </div>
    )
}

export default DrawingPage