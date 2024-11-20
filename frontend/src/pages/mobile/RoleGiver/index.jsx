import "../../../App.css"

import InfoGiver from "../../../components/InfoGiver";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RoleGiver = ({socket}) => {
    const { id: roomID } = useParams();
    const [role, setRole] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // Emit a "get-story" event to the server with the room ID
        socket.emit("get-users", roomID, (response) => {
            if (response.success) {
                let username = localStorage.getItem("username");
                let user = response.users.find(user => user.username === username);
                setRole(user.role);
                setUrl(`/drawing/${roomID}`);
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
            <InfoGiver text="Nesta ronda és" role={role} url={url}/>
        </div>
    );
}

export default RoleGiver;