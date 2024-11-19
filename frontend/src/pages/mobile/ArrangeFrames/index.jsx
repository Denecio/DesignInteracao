import "./ArrangeFrames.css"

import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from 'react-router-dom';

import check from "../../../assets/icons/check.png"
import FinalFrames from "../../../components/FinalFrames"
import buttonsound from '../../../assets/sounds/button.mp3';


const ArrangeFrames = ({socket}) => {
    const { id: roomID } = useParams();
    const [frames, setFrames] = useState([]);
    const [role, setRole] = useState("");
    const [timeLeft, setTimeLeft] = useState(30); // Timer 30s
    const [canMoveFrames, setCanMoveFrames] = useState(true); // Flag to indicate if frames can be moved
    const navigate = useNavigate();
    useEffect(() => {

        socket.emit('get-users', roomID, (response) => {
            if (response.success) {
                const artistFrames = response.users
                .filter(user => user.role === 'Artist')
                .map(user => user.img);

                setFrames(artistFrames);
                setRole(response.users.filter(user => user.username === localStorage.getItem('username'))[0].role);
            } else {
                alert(response.message || 'Failed to get frames');
            }
        });

        const handleFrames = (data) => {
            //console.log("Frames arranged", data);
            navigate(`/final/${roomID}`);
        }

        socket.on("arranged-frames", handleFrames);

        return () => {
            socket.off("arranged-frames", handleFrames);
        }
    }, [roomID])

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanMoveFrames(false); 
        }
    }, [timeLeft]);

    const moveFrame = useCallback((dragIndex, hoverIndex) => {
        setFrames((prevFrames) => {
            const updatedFrames = [...prevFrames];
            const [draggedFrame] = updatedFrames.splice(dragIndex, 1); 
            updatedFrames.splice(hoverIndex, 0, draggedFrame); 
            return updatedFrames;
        });
    }, []);
    
    const handleCheck = () => {
        let ButtonSound = new Audio(buttonsound);
        ButtonSound.play().catch(error => {
            console.error("Error playing button sound:", error);
        });

        ButtonSound.addEventListener('ended', () => {
            window.location.href = url;
        });

        socket.emit("arrange-frames", roomID, frames, (response) => {
            if (response.success) {
                //console.log("Frames arranged");
            } else {
                alert(response.message || "Failed to arrange frames");
            }
        });

        return () => {
            socket.disconnect();
        };
    }

    return (
        
        <DndProvider backend={HTML5Backend}>
            {role === "Artist" ? <h1>Espera pela tua vez</h1> : 
            <div className="arrangeframes_page">
                <div className="arrangeframes_container">
                    <p className="arrangetext">Arrasta os frames para criar a história!</p>
                    <p className="timer">Tempo Restante: {timeLeft} segundos</p>
                    <div className="arrangeframes_frames">
                        {frames.map((frame, index) => {
                            return <FinalFrames key={index}
                            index={index}
                            number={index + 1}
                            src={frame}
                            moveFrame={canMoveFrames ? moveFrame : null}
                            />
                        })}
                    </div>
                </div>
                <button className="check_button" onClick={handleCheck}> <img src={check} alt="Confirm" /> </button>
            </div>}
        </DndProvider>
    )
}


export default ArrangeFrames