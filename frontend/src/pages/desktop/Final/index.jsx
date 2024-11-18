import "./Final.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Final = ({socket}) => {
    const { id: roomID } = useParams();
    const [frames, setFrames] = useState([]);

    useEffect(() => {
        socket.emit('get-arranged-frames', roomID, (response) => {
            if (response.success) {
                console.log(response.frames);
                setFrames(response.frames);
            } else {
                alert(response.message || 'Failed to get frames');
            }
        });
    }, [roomID, socket])

    return (
        <div className="finalpage">
            <p className="finaltext">Era uma vez...</p>
            <div className="finalframes">
                {frames?.map((frame, index) => {
                    return(
                        <img className="finalframes_image" src={frame} alt="Frame" />
                    )
                    
                })}
            </div>
       </div>
    )
}

export default Final