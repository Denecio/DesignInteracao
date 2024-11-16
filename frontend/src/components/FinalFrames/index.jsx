import "./FinalFrames.css"

const FinalFrames = ({ number }) => {
  return (
    <div className="final_frames">
        <p className="framestext">{number}º frame</p>
        <img className="framesimage"src="https://via.placeholder.com/150" alt="Frame" />
    </div>
  )
}

export default FinalFrames