import "./Loading.css"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const Loading = ({text, page, url, socket}) => {
    const { id: roomID } = useParams();

    useEffect(() => {
        const handleGameStarted = (data) => {
            console.log("Received 'game-started':", data);
            // Handle game start (e.g., navigate to the next page)
            window.location.href = `/story/${roomID}`;
        };

        socket.on("game-started", handleGameStarted);

        return () => {
            socket.off("game-started", handleGameStarted);
        }
    }, [roomID, socket]);

    return(
        <p className="loading_text">{text}</p>
    )
}

export default Loading