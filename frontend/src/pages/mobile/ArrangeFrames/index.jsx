import "./ArrangeFrames.css"
import check from "../../../assets/icons/check.png"


const ArrangeFrames = () => {
    return (
        <div className="arrangeframes_page">
            <div className="arrangeframes_container">
                <p className="arrangetext">Arrasta os frames para criar a história!</p>
            </div>
            <button className="check_button"> <img src={check} alt="Confirm" /> </button>
        </div>
    )
}


export default ArrangeFrames