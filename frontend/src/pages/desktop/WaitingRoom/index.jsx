import "./WaitingRoom.css";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:8000");

const WaitingRoom = () => {
    const { id: roomID } = useParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Emit a "load-room" event to the server with the room ID
        socket.emit("load-room", roomID, (response) => {
            if (response.success) {
                setUsers(response.users);
            } else {
                alert(response.message || "Failed to load room");
            }
        });

        return () => {
            socket.off("room-users");
        };
    }, [roomID]);

    return (
        <div className="waitingroom_container">
            <h1>Sala {roomID}</h1>
            <ul>
                {users.map((user) => (
                    <li key={user}>{user}</li>
                ))}
            </ul>
        </div>
    );
}

export default WaitingRoom;