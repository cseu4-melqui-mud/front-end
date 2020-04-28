import React, {useEffect, useState} from 'react';
import axios from "axios"
import Alert from "./alert.js"

function Game() {

    const [error, setError] = useState(false)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/adv/init/`)
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err.message);
        })
    })

    const move = (e) => {
        e.preventDefault();
        let direction = e.target.name
        let possibleMoves = ["n", "s"]
        if(possibleMoves.includes(direction)) {
            // axios.post("")
        } else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    }

  return (
    <div className="game">
        {error ? <Alert /> : null}
        <div className="game-window">

        </div>
        <div className="bottom-row">
            <div className="room-info">
                
            </div>
            <div className="controls">
                <div className="arrow-pad">
                 <img src="https://i.imgur.com/SNijaNB.png" onClick={move} name="n" width="60px" alt="an arrow" className="up-arrow"/>
                 <div className="middle-arrows">
                 <img src="https://i.imgur.com/SNijaNB.png" onClick={move} name="w" width="60px" alt="an arrow" className="arrow-key" />
                 <img src="https://i.imgur.com/SNijaNB.png" onClick={move} name="e" width="60px" alt="an arrow" className="arrow-key" />
                 </div>
                 <img src="https://i.imgur.com/SNijaNB.png" onClick={move} name="s" width="60px" alt="an arrow" className="down-arrow" />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Game;
