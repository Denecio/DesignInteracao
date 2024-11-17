import "./FinalFrames.css"

const FinalFrames = ({ number, src }) => {
  return (
    <div className="final_frames">
        <p className="framestext">{number}º frame</p>
        <img className="framesimage" src={src} alt="Frame" />
    </div>
  )
}

export default FinalFrames