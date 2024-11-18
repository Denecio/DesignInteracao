import "./FinalFrames.css";
import { useDrag, useDrop } from "react-dnd";
import { forwardRef, useRef } from "react";

const ITEM_TYPE = "FRAME";

const FinalFrames = ({ index, number, src, moveFrame }) => {
    const ref = useRef(null); // Create a ref for the DOM element

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item) {
            if (item.index !== index) {
                moveFrame(item.index, index);
                item.index = index; // Update the drag item's index
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref)); // Combine drag and drop refs

    const opacity = isDragging ? 0.5 : 1;

    return (
        <div ref={ref} className="final_frames" style={{ opacity }}>
            <p className="framestext">{number}º frame</p>
            <img className="framesimage" src={src} alt="Frame" />
        </div>
    );
};

export default FinalFrames;
