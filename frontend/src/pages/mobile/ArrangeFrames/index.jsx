import "./ArrangeFrames.css"
import check from "../../../assets/icons/check.png"
import buttonsound from '../../../assets/sounds/button.mp3';


const ArrangeFrames = () => {

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
        <div className="arrangeframes_page">
            <div className="arrangeframes_container">
                <p className="arrangetext">Arrasta os frames para criar a história!</p>
            </div>
            <button className="check_button" onClick={handleClick}> <img src={check} alt="Confirm" /> </button>
        </div>
    )
}


export default ArrangeFrames