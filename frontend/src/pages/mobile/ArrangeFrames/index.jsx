import "./ArrangeFrames.css"

import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import check from "../../../assets/icons/check.png"
import FinalFrames from "../../../components/FinalFrames"

const ArrangeFrames = ({socket}) => {
    const { id: roomID } = useParams();
    const [frames, setFrames] = useState([]);


    useEffect(() => {

        socket.emit('get-users', roomID, (response) => {
            if (response.success) {
                const artistFrames = response.users
                .filter(user => user.role === 'Artist')
                .map(user => user.img);

                setFrames(artistFrames);
            } else {
                alert(response.message || 'Failed to get frames');
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [roomID])

    const moveFrame = useCallback((dragIndex, hoverIndex) => {
        setFrames((prevFrames) => {
            const updatedFrames = [...prevFrames];
            const [draggedFrame] = updatedFrames.splice(dragIndex, 1); // Remove dragged frame
            updatedFrames.splice(hoverIndex, 0, draggedFrame); // Insert at new position
            return updatedFrames;
        });
    }, []);
    
    const handleCheck = () => {
        socket.emit("arrange-frames", roomID, frames, (response) => {
            if (response.success) {
                console.log("Frames arranged");
                window.location.href = `/final/${roomID}`;

            } else {
                alert(response.message || "Failed to arrange frames");
            }
        });

        return () => {
            socket.disconnect();
        };
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="arrangeframes_page">
                <div className="arrangeframes_container">
                    <p className="arrangetext">Arrasta os frames para criar a história!</p>
                    <div className="arrangeframes_frames">
                        {frames.map((frame, index) => {
                            return <FinalFrames key={index}
                            index={index}
                            number={index + 1}
                            src={frame}
                            moveFrame={moveFrame}
                            />
                        })}
                    </div>
                </div>
                <button className="check_button" onClick={handleCheck}> <img src={check} alt="Confirm" /> </button>
            </div>
        </DndProvider>
    )
}


export default ArrangeFrames