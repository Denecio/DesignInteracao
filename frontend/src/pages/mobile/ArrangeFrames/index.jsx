import "./ArrangeFrames.css"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"

import check from "../../../assets/icons/check.png"
import FinalFrames from "../../../components/FinalFrames"

const ArrangeFrames = () => {
    const { id: roomID } = useParams();
    const [frames, setFrames] = useState([]);


    useEffect(() => {
        const socket = io.connect('http://localhost:8000');

        socket.emit('get-users', roomID, (response) => {
            if (response.success) {
                console.log(response.users);
                for(let user of response.users) {
                    if(user.role === 'Artist') {
                        setFrames([...frames, user.img]);
                    }
                }
            } else {
                alert(response.message || 'Failed to get frames');
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [roomID])

    console.log(frames);

    return (
        <div className="arrangeframes_page">
            <div className="arrangeframes_container">
                <p className="arrangetext">Arrasta os frames para criar a história!</p>
                <div className="arrangeframes_frames">
                    {frames.map((frame, index) => {
                        return <FinalFrames key={index} number={index+1} src={frame} />
                    })}
                </div>
            </div>
            <button className="check_button"> <img src={check} alt="Confirm" /> </button>
        </div>
    )
}


export default ArrangeFrames