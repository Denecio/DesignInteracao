import "./DrawingPage.css"
import "../../../App.css"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom"
import check from "../../../assets/icons/check.png"
import brush from "../../../assets/icons/brush.png"
import eraser from "../../../assets/icons/eraser.png"
import trash from "../../../assets/icons/trash.png"
import buttonsound from '../../../assets/sounds/button.mp3';

import Canvas from "../../../components/Canvas"

const DrawingPage = ({socket}) => {
    const { id: roomID } = useParams();
    const [text, setText] = useState("")
    const [role, setRole] = useState("")
    const canvasRef = useRef(null);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    useEffect(() => {
        socket.emit("get-users", roomID, (response) => {
            if (response.success) {
                let user = response.users.find(user => user.username === username);
                setText(user.story);
                setRole(user.role);
            } else {
                alert(response.message || "Failed to get story");
            }
        });

        const handleAllDrawings = (data) => {
            //console.log("Received 'all-drawings':", data);
            navigate(`/arrange-frames/${roomID}`);
        }

        socket.on("all-drawings", handleAllDrawings);

        return () => {
            socket.off("all-drawings", handleAllDrawings);
        }
    }, [roomID, socket]);

    const handleEnter = () => { 
        let ButtonSound = new Audio(buttonsound);
        ButtonSound.play().catch(error => {
            console.error("Error playing button sound:", error);
        });

        ButtonSound.addEventListener('ended', () => {
            window.location.href = url;
        });
        if (canvasRef.current) {
            const imageData = canvasRef.current.getCanvasImage();
            socket.emit('drawing', roomID, username, imageData, (response) => {
                if (response.success) {
                    //console.log("Drawing sent successfully");
                }
            });
        } else {
            //console.error('Canvas ref is not defined');
        }
    }

    
    return (
        <div className="drawingpage">
            {role === "Artist" ? 
            <div className="drawingpage_container">
                <div className="buttons">
                    <button className="btn-brush"> <img src={brush} alt="Confirm" /> </button>
                    <button className="btn-eraser"> <img src={eraser} alt="Confirm" /> </button>
                    <button className="btn-trash"> <img src={trash} alt="Confirm" /> </button>
                </div>
                <div className="drawing">
                    <p >{text ? text : "aosidaoidnaosnd"}</p>
                    <Canvas ref={canvasRef}/>
                </div>
                <button className="check_button" onClick={handleEnter}> <img src={check} alt="Confirm" /> </button>
            </div> : <h1>Espera pela tua vez</h1>}
        </div>
    )
}

export default DrawingPage