import "./DrawingPage.css"
import { io } from "socket.io-client"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import check from "../../../assets/icons/check.png"
import brush from "../../../assets/icons/brush.png"
import eraser from "../../../assets/icons/eraser.png"
import trash from "../../../assets/icons/trash.png"

import Canvas from "../../../components/Canvas"

const socket = io.connect('http://localhost:8000');

const DrawingPage = () => {
    const { id: roomID } = useParams();
    const [image, setImage] = useState(null);
    const [text, setText] = useState("")
    const canvasRef = useRef(null);

    useEffect(() => {
        socket.emit('get-story', roomID, (data) => {
            if (!data.success) 
                return setText(data.message)
            setText(data.story.text)
        })
    })


    const handleEnter = () => {
        
        if (canvasRef.current) {
            const imageData = canvasRef.current.getCanvasImage(); // Call the exposed method
            console.log(imageData); // Base64 string of the canvas image
        } else {
            console.error('Canvas ref is not defined');
        }

        socket.emit('drawing', image)
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
                <button className="btn-enter" onClick={handleEnter}> <img src={check} alt="Confirm" /> </button>
            </div>
        </div>
    )
}

export default DrawingPage