import "./EnterRoom.css"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import check from "../../../assets/icons/check.png"

const socket = io('http://localhost:8000');

const EnterRoom = () => {
    const [roomID, setRoomID] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('username');
    });

    const handleEnterRoom = () => {
        if (!roomID) {
            alert('Please enter a room ID');
            return;
        }

        if (!username) {
            alert('Please enter a username');
            return;
        }

        //set username to local storage
        localStorage.setItem('username', username);

        // Emit a "join-room" event to the server with the room ID
        socket.emit('join-room', roomID, username, (response) => {
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
                <input type="text" className="input" placeholder="ID da Sala" value={roomID} onChange={(e) =>  setRoomID(e.target.value)}/>
                <input type="text" className="input" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <button className="check_button" onClick={handleEnterRoom}> <img src={check} alt="Confirm"/> </button>
        </div>
    )
}

export default EnterRoom