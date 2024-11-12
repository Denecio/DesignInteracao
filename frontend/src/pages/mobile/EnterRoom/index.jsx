import "./EnterRoom.css"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import check from "../../../assets/icons/check.png"

const socket = io('http://localhost:8000');

const EnterRoom = () => {
    const [roomID, setRoomID] = useState('');
    const navigate = useNavigate();

    const handleRoomIDChange = (e) => {
        setRoomID(e.target.value);
    };

    const handleEnterRoom = () => {
        if (!roomID) {
            alert('Please enter a room ID');
            return;
        }

        // Emit a "join-room" event to the server with the room ID
        socket.emit('join-room', roomID, (response) => {
            if (response.success) {
                // Navigate to the drawing page if successful
                navigate(`/room/${roomID}`);
            } else {
                alert(response.message || 'Failed to join room');
            }
        });
    };

    return(
        <div className="enterroom_container">
            <div className="container">
                <input type="text" className="input" placeholder="ID da Sala" value={roomID} onChange={handleRoomIDChange}/>
            </div>
            <button className="btn-enter" onClick={handleEnterRoom}> <img src={check} alt="Confirm"/> </button>
        </div>
    )
}

export default EnterRoom