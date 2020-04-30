import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "./alert.js";
import Loader from "./loader"
import {LogoutButton} from "./button"
/*https://i.imgur.com/JKiAwtK.png https://i.imgur.com/Q5oyTpz.png */
function Game(props) {
  const [error, setError] = useState(false);
  const [gameData, setGameData] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingMap, setLoadingMap] = useState(false)
  const [mapData, setMapData] = useState([])
  const [roomData, setRoomData] = useState({})
  const [roomInfo, setRoomInfo] = useState({})
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
        
        let roomsInfo = {}
        res.data.rooms.forEach((curr) => {
          tempObj[curr.id] = curr.room_type
          roomsInfo[curr.id] = curr
        })
        console.log(tempObj, "TEMP");
        res.data.map.forEach((row) => {
          row.forEach((room) => {
            mapDataX.push(tempObj[room])
          })
        })
        setRoomData(tempObj)
        setRoomInfo(roomsInfo)
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
    console.log("mapRoom", mapRooms);
    let direction = e.target.name;
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/adv/move/`, {direction: direction}, axiosConfig)
      .then((res) => {
        setGameData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false)
        setError(true);
        setTimeout(() => {
        setError(false);
      }, 3000);
      }) 
  };
  
  if(!gameData.room || Object.keys(roomInfo).length === 0) {
    return null
  }
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
                return(<div key={`${index}_${i2}`} className={`two-field ${(gameData.room.id === room ? " player" : '')}`}><img src="https://image.flaticon.com/icons/svg/1852/1852690.svg" alt="ss" width="95%"/></div>)
            } else if(roomData[room] === 3) {
                return(<div key={`${index}_${i2}`} className={`three-field ${(gameData.room.id === room ? " player" : '')}`}><img src="https://image.flaticon.com/icons/png/512/1696/1696386.png" alt="ss" width="95%"/></div>)
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
          <h1 className="game-title">{roomInfo[gameData.room.id].title}</h1>
          <p className="game-description">{roomInfo[gameData.room.id].description}</p>
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
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Game;
