import "./Final.css"
import "../../../App.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import buttonsound from '../../../assets/sounds/button.mp3';
import { useNavigate } from "react-router-dom";

const Final = ({ socket }) => {
    const { id: roomID } = useParams();
    const [frames, setFrames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        socket.emit('get-arranged-frames', roomID, (response) => {
            if (response.success) {
                console.log(response.frames);
                setFrames(response.frames);
            } else {
                alert(response.message || 'Failed to get frames');
            }
        });

        const handleGameEnded = () => {
            console.log("Game ended");
            navigate(`/`);
        }

        socket.on("game-ended", handleGameEnded);

        return () => {
            socket.off("game-ended", handleGameEnded);
        }
    }, [roomID, socket])

    const handleCheck = () => {

        let ButtonSound = new Audio(buttonsound);
        ButtonSound.play().catch(error => {
            console.error("Error playing button sound:", error);
        });

        socket.emit("end-game", roomID, (response) => {
            if (!response.success) {
                alert(response.message || "Failed to start game");
            }   
        })
    }


    return (
        <div className="finalpage">
            <p className="finaltext">Era uma vez...</p>
            <div className="finalframes">
                {frames?.map((frame, index) => {
                    return (
                        <img className="finalframes_image" src={frame} alt="Frame" />
                    )

                })}
            </div>
            <button className="btn-end" onClick={handleCheck}> <p>Criar Nova Sala</p> </button>
        </div>
    )
}

export default Final