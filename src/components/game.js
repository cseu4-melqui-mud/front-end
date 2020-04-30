import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "./alert.js";
import Loader from "./loader"
/*https://i.imgur.com/JKiAwtK.png https://i.imgur.com/Q5oyTpz.png */
function Game() {
  const [error, setError] = useState(false);
  const [gameData, setGameData] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingMap, setLoadingMap] = useState(false)
  const [mapData, setMapData] = useState([])
  const [roomData, setRoomData] = useState({})
  const [mapRooms, setMapRooms] = useState([])
  let mapDataX = []
    

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
    setLoadingMap(true)

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/adv/rooms/`, axiosConfig)
      .then((res) => {
        let tempObj = {}
        res.data.rooms.forEach((curr) => {
          tempObj[curr.id] = curr.room_type
        })
        console.log(tempObj, "TEMP");
        res.data.map.forEach((row) => {
          row.forEach((room) => {
            mapDataX.push(tempObj[room])
          })
        })
        setRoomData(tempObj)
        setLoadingMap(false)
        console.log(mapDataX, "MAPDATAX");
        setMapData(mapDataX)
        setMapRooms(res.data.map)
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/adv/init/`, axiosConfig)
      .then((res) => {
        setGameData(res.data)
        console.log(res.data, "INIT")
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
      {loadingMap ? <Loader size="6rem"/> :
        <div className="map">
         {mapRooms.map((row, index) => {
           return row.map((room, i2) => {
            if (roomData[room] === 0) {
                return(<div key={`${index}_${i2}`} className="zero-field"></div>)
            } else if (roomData[room] === 1){
                return(<div key={`${index}_${i2}`} className={`one-field ${(gameData.room.id === room ? " player" : '')}`}><img src="https://image.flaticon.com/icons/svg/1852/1852661.svg" alt="ss" width="95%"/></div>)
               
            } else if (roomData[room] === 2) {
                return(<div key={`${index}_${i2}`} className={`two-field ${(gameData.room.id === room ? " player" : '')}`}><img src="https://image.flaticon.com/icons/svg/752/752665.svg" alt="ss" width="95%"/></div>)
            } else if(roomData[room] === 3) {
                return(<div key={`${index}_${i2}`} className={`three-field ${(gameData.room.id === room ? " player" : '')}`}><img src="https://image.flaticon.com/icons/svg/183/183360.svg" alt="ss" width="95%"/></div>)
            }
        })
      })
      }
        </div> 
        }
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
