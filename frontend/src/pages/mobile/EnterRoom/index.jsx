import "./EnterRoom.css"
import "../../../App.css"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import check from "../../../assets/icons/check.png"
import buttonsound from '../../../assets/sounds/button.mp3';

const EnterRoom = ({ socket }) => {
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

        if (!username && window.innerWidth < 768) {
            alert('Please enter a username');
            return;
        }

        let ButtonSound = new Audio(buttonsound);
        ButtonSound.play().catch(error => {
            console.error("Error playing button sound:", error);
        });


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

    return (
        <div className="enterroom_page">
            <h1 className="enterroom_title">{window.innerWidth > 768 ? "Cria a tua sala!" : "Entra na tua sala!"}</h1>
            <div className="enterroom_container">
                <input type="text" className="container_input" placeholder="ID da Sala" value={roomID} onChange={(e) => setRoomID(e.target.value)} />
                {window.innerWidth < 768 && <input type="text" className="container_input" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />}
            </div>
            <button className="check_button" onClick={handleEnterRoom}> <img src={check} alt="Confirm" /> </button>

        </div>
    )
}

export default EnterRoom