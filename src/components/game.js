import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "./alert.js";
import Loader from "./loader"
import { fireEvent } from "@testing-library/react";
/*https://i.imgur.com/JKiAwtK.png https://i.imgur.com/Q5oyTpz.png */
function Game() {
  const [error, setError] = useState(false);
  const [gameData, setGameData] = useState({})
  const [loading, setLoading] = useState(false)
  let sampleLayers = [
    1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 2, 1, 2, 2, 2, 2, 1,
    1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 2, 1, 2, 2, 2, 2, 3,
    1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 2, 1, 2, 2, 2, 2, 1,
    1, 1, 2, 1, 2, 2, 2, 2, 1,
    1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0]

    const token = localStorage.getItem('token')
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${token}` 
        }
    };

    const handleKeyPress = (e) => {
      if (e.key === "w") {
        document.querySelector("#n").click()
      } else if (e.key === "d") {
        document.querySelector("#e").click()
      } else if (e.key === "s") {
        document.querySelector("#s").click()
      } else if (e.key === "a") {
        document.querySelector("#w").click()
      }
    }

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/adv/init/`, axiosConfig)
      .then((res) => {
        setGameData(res.data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const move = (e) => {
    e.preventDefault();
    setLoading(true)
    let direction = e.target.name;
    let possibleMoves = ["n", "s", "w", "e"];
    if (possibleMoves.includes(direction)) {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/adv/move/`, {direction: direction}, axiosConfig)
      .then((res) => {
        setGameData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.message);
      })
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className="game">
      {error ? <Alert /> : null}
      <div className="game-window">
        <div className="map">
        {sampleLayers.map((curr, index) => {
            if (curr === 0) {
                return(<div key={index} name={index +1} className="zero-field"></div>)
            } else if (curr === 1){
                return(<div key={index} name={index +1} className="one-field"><img src="https://image.flaticon.com/icons/svg/2850/2850337.svg" alt="ss" width="95%"/></div>)
            } else if (curr === 2) {
                return(<div key={index} name={index +1} className="two-field"><img src="https://svgur.com/i/KcH.svg" alt="ss" width="95%"/></div>)
            } else {
                return(<div key={index} name={index +1} className="player"><img src="https://i.imgur.com/JKiAwtK.png" alt="ss" width="95%"/></div>)
            }
        })}
        </div> 
      </div>
      <div className="bottom-row">
        <div className="room-info">
          {loading ? 
            <div><Loader /></div> 
            :
          <div className="room-info-inner">
            <h1 className="game-title">{gameData.title}</h1>
            <p className="game-description">{gameData.description}</p>
            </div> 
          }
        </div>
        <div className="controls">
          <div className="arrow-pad">
            <img
              src="https://i.imgur.com/SNijaNB.png"
              onClick={move}
              name="n"
              id="n"
              width="60px"
              alt="an arrow"
              className="up-arrow"
            />
            <div className="middle-arrows">
              <img
                src="https://i.imgur.com/SNijaNB.png"
                onClick={move}
                name="w"
                id="w"
                width="60px"
                alt="an arrow"
                className="arrow-key"
              />
              <img
                src="https://i.imgur.com/SNijaNB.png"
                onClick={move}
                name="e"
                id="e"
                width="60px"
                alt="an arrow"
                className="arrow-key"
              />
            </div>
            <img
              src="https://i.imgur.com/SNijaNB.png"
              onClick={move}
              name="s"
              id="s"
              width="60px"
              alt="an arrow"
              className="down-arrow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
