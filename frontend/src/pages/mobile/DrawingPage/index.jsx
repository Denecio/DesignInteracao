import "./DrawingPage.css"
import check from "../../../assets/icons/check.png"
import brush from "../../../assets/icons/brush.png"
import eraser from "../../../assets/icons/eraser.png"
import trash from "../../../assets/icons/trash.png"
import buttonsound from '../../../assets/sounds/button.mp3';

const DrawingPage = ({ texto }) => {

    const handleClick = () => {
        let ButtonSound = new Audio(buttonsound);
        ButtonSound.play().catch(error => {
            console.error("Error playing button sound:", error);
        });

        ButtonSound.addEventListener('ended', () => {
            window.location.href = url;
        });


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
                <button className="btn-enter" onClick={handleClick}> <img src={check} alt="Confirm" /> </button>


            </div>



        </div>
    )
}

export default DrawingPage