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

const DrawingPage = ({ socket }) => {
    const { id: roomID } = useParams();
    const [text, setText] = useState("")
    const [role, setRole] = useState("")
    const [color, setColor] = useState("#000")
    const canvasRef = useRef(null);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const [horizontal, setHorizontal] = useState(false);

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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setHorizontal(true);
            } else {
                setHorizontal(false);
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleEnter = () => {
        let ButtonSound = new Audio(buttonsound);
        ButtonSound.play().catch(error => {
            console.error("Error playing button sound:", error);
        });

        ButtonSound.addEventListener('ended', () => {
            if (canvasRef.current) {
                console.log("Sending drawing...");
                const imageData = canvasRef.current.getCanvasImage();
                socket.emit('drawing', roomID, username, imageData, (response) => {
                    if (response.success) {
                        //console.log("Drawing sent successfully");
                    } else {
                        console.log(response.message || "Failed to send drawing");
                    }
                });
            } else {
                console.error('Canvas ref is not defined');
            }
        }); 
    }

    const clearCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.clearCanvas();
        }
    }

    return (
        <div className="drawingpage">
            {role === "Artist" ?
                (horizontal ? "Por favor, utilize o telemóvel horizontalmente para desenhar" :
                <div className="drawingpage_container">
                    <div className="buttons">
                        <button className="btn-brush" onClick={() => setColor("#000")}> <img src={brush} alt="Confirm" /> </button>
                        <button className="btn-eraser" onClick={() => setColor("#f5f5f5")}> <img src={eraser} alt="Confirm" /> </button>
                        <button className="btn-trash" onClick={clearCanvas}> <img src={trash} alt="Confirm" /> </button>
                    </div>
                    <div className="drawing">
                        <p >{text ? text : "aosidaoidnaosnd"}</p>
                        <Canvas ref={canvasRef} color={color}/>
                    </div>
                    <button className="check_button" onClick={handleEnter}> <img src={check} alt="Confirm" /> </button>
                </div>)
                : <h1>Espera pela tua vez...</h1>
            }
        </div>
    )
}

export default DrawingPage