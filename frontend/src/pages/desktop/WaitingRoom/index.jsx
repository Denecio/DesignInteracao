import "./WaitingRoom.css";
import "../../../App.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerCard from "../../../components/PlayerCard";
import check from "../../../assets/icons/check.svg";
import { useNavigate } from 'react-router-dom';
import playerlogin from '../../../assets/sounds/playerlogin.mp3';
import buttonsound from '../../../assets/sounds/button.mp3';

const WaitingRoom = ({socket}) => {
    const { id: roomID } = useParams();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Emit a "load-room" event to the server with the room ID
        socket.emit("load-room", roomID, (response) => {
            if (response.success) {
                setUsers(response.users);
            } else {
                alert(response.message || "Failed to load room");
            }
        });
    
        // Listen for "room-users" events from the server
        const handleRoomUsers = (data) => {
            //console.log("Received 'room-users':", data);
            setUsers(data.users);
            let loginSound = new Audio(playerlogin);
            loginSound.play().catch(error => {
                console.error("Error playing login sound:", error);
            });
        };
    
        socket.on("room-users", handleRoomUsers);

        const handleGameStarted = (data) => {
            //console.log("Received 'game-started':", data);
            // Handle game start (e.g., navigate to the next page)
            navigate(`/story/${roomID}`);
        };

        socket.on("game-started", handleGameStarted);

        // Clean up the listeners when the component unmounts
        return () => {
            socket.off("room-users", handleRoomUsers);
            socket.off("game-started", handleGameStarted);
        };
    }, [roomID, socket]);
    
    const handleCheck = () => {

        let ButtonSound = new Audio(buttonsound);
        ButtonSound.play().catch(error => {
            console.error("Error playing button sound:", error);
        });

        console.log("Check");
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
                <button className="check_button" onClick={handleCheck}> <img src={check} alt="Confirm" /> </button>
            </div>
        </div>
    );
}

export default WaitingRoom;