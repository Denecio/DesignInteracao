import "./WaitingRoom.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerCard from "../../../components/PlayerCard";
import check from "../../../assets/icons/check.svg";

const WaitingRoom = ({socket}) => {
    const { id: roomID } = useParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Emit a "load-room" event to the server with the room ID
        socket.emit("load-room", roomID, (response) => {
            console.log(response);
            if (response.success) {
                setUsers(response.users);
            } else {
                alert(response.message || "Failed to load room");
            }
        });
    
        // Listen for "room-users" events from the server
        const handleRoomUsers = (data) => {
            console.log("Received 'room-users':", data);
            setUsers(data.users);
        };
    
        socket.on("room-users", handleRoomUsers);

        const handleGameStarted = (data) => {
            console.log("Received 'game-started':", data);
            // Handle game start (e.g., navigate to the next page)
            window.location.href = `/story/${roomID}`;
        };

        socket.on("game-started", handleGameStarted);

        // Clean up the listeners when the component unmounts
        return () => {
            socket.off("room-users", handleRoomUsers);
            socket.off("game-started", handleGameStarted);
        };
    }, [roomID, socket]);
    
    const handleCheck = () => {
        socket.emit("start-game", roomID, (response) => {
            if (!response.success) {
                alert(response.message || "Failed to start game");
            }      
        })
    }

    return (
        <div className="waitingroom_page">
            <h1>O ID da Sala é: {roomID}</h1>
            <div className="waitingroom_content">
                <div className="waitingroom_info">
                    <h2>Jogadores: {users.length}</h2>
                    <ul className="waitingroom_players">
                        {users.map((user) => (
                            <PlayerCard key={user} player={user.username} />
                        ))}
                    </ul>
                </div>
                <div className="waitingroom_placeholder">?</div>
            </div>
            <div className="waintingroom_end">
                <h3>Estão todos?</h3>
                <div></div>
                <button className="check_button" onClick={ handleCheck }> <img src={check} alt="Confirm" /> </button>
            </div>
        </div>
    );
}

export default WaitingRoom;