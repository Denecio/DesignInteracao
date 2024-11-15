import "./PlayerCard.css";
import Face from "../../assets/icons/face.svg";

const PlayerCard = ({ player }) => {
    return (
        <div className="player_card">
            <img src={Face} alt={player} />
            <p>{player}</p>
        </div>
    );
};

export default PlayerCard;