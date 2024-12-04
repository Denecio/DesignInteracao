import "./Loading.css"
import "../../../App.css"

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const Loading = ({text, page, url, socket}) => {
    const { id: roomID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleGameStarted = (data) => {
            console.log("Received 'game-started':", data);
            // Handle game start (e.g., navigate to the next page)
            navigate(`/role/${roomID}`);
        };

        const handleGameEnded = (data) => {
            console.log("Received 'game-ended':", data);
            // Handle game start (e.g., navigate to the next page)
            navigate(`/`);
        };

        socket.on("game-started", handleGameStarted);
        socket.on("game-ended", handleGameEnded);

        return () => {
            socket.off("game-started", handleGameStarted);
            socket.off("game-ended", handleGameEnded);
        }
    }, [roomID, socket]);

    return(
        <p className="loading_text">{text}</p>
    )
}

export default Loading