import "./DrawingPage.css"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import check from "../../../assets/icons/check.png"
import brush from "../../../assets/icons/brush.png"
import eraser from "../../../assets/icons/eraser.png"
import trash from "../../../assets/icons/trash.png"

import Canvas from "../../../components/Canvas"

const DrawingPage = ({socket}) => {
    const { id: roomID } = useParams();
    const [text, setText] = useState("")
    const canvasRef = useRef(null);
    const username = localStorage.getItem("username");

    useEffect(() => {
        socket.emit("get-users", roomID, (response) => {
            if (response.success) {
                let user = response.users.find(user => user.username === username);
                setText(user.story);
            } else {
                alert(response.message || "Failed to get story");
            }
        });
    })


    const handleEnter = () => { 
        if (canvasRef.current) {
            const imageData = canvasRef.current.getCanvasImage();
            socket.emit('drawing', roomID, username, imageData, (response) => {
                if (response.success) {
                    window.location.href = `/arrange-frames/${roomID}`;
                } else {
                    console.error(response.message || 'Failed to send drawing');
                }
            });
        } else {
            console.error('Canvas ref is not defined');
        }
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
                    <p >{text ? text : "aosidaoidnaosnd"}</p>
                    <Canvas ref={canvasRef}/>
                </div>
                <button className="check_button" onClick={handleEnter}> <img src={check} alt="Confirm" /> </button>
            </div>
        </div>
    )
}

export default DrawingPage