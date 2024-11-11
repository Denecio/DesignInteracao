const EnterRoom = () => {
    return(
        <div className="enterroom_container">
            <div className="container">
                <input type="text" className="input" placeholder="ID da Sala"/>
            </div>
            <button className="btn-enter"> <img src="icons/check.png" alt="Confirm"/> </button>
        </div>
    )
}

export default EnterRoom