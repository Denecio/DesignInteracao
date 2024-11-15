import InfoGiver from "../../../components/InfoGiver";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const StoryGiver = () => {
    const { id: roomID } = useParams();
    const [story, setStory] = useState(null);

    useEffect(() => {
        // Emit a "get-story" event to the server with the room ID
        socket.emit("get-story", roomID, (response) => {
            if (response.success) {
                setStory(response.story);
            } else {
                alert(response.message || "Failed to get story");
            }
        });

        return () => {
            socket.off("get-story");
        };
    });

    return (
        <div className="storygiver_page">
            <InfoGiver text="Era uma vez..." role={story?.title} />
        </div>
    );
}

export default StoryGiver;