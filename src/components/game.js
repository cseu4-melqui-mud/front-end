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
    
    setTimeout(() => {
      if (document.querySelectorAll("#character").length > 1) {
        document.querySelector("#character").classList.add("invisible")
      }
    }, 300)

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
    let direction = e.target.name;
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/adv/move/`, { direction: direction }, axiosConfig)
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

  const showRoomDirections = (room, x, y) => {
    const output = []
    if (room.n_to > 0 && (room.room_type === 1 || (y - 1 >= 0 && mapRooms[y - 1][x] === room.n_to))) {
      output.push(<img key={`${room.id}_north`} src="map/north.png" width="100%" alt="Go north" />)
    }
    if (room.s_to > 0 && (room.room_type === 1 || (y + 1 < 14 && mapRooms[y + 1][x] === room.s_to))) {
      output.push(<img key={`${room.id}_south`} src="map/south.png" width="100%" alt="Go south" />)
    }
    if (room.e_to > 0 && (room.room_type === 1 || (x + 1 < 14 && mapRooms[y][x + 1] === room.e_to))) {
      output.push(<img key={`${room.id}_east`} src="map/east.png" width="100%" alt="Go east" />)
    }
    if (room.w_to > 0 && (room.room_type === 1 || (x - 1 >= 0 && mapRooms[y][x - 1] === room.w_to))) {
      output.push(<img key={`${room.id}_west`} src="map/west.png" width="100%" alt="Go west" />)
    }
    return output
  }

  if (!gameData.room || Object.keys(roomInfo).length === 0) {
    return null
  }

  if (document.querySelectorAll("#character").length > 1) {
    document.querySelector("#character").classList.add("invisible")
  }
  return (
    <div className="game">
      {error ? <Alert /> : null}
      <div className="game-window">
        {loadingMap ? <Loader size="6rem" /> :
          <div className="map">
            {mapRooms.map((row, y) => {
              return row.map((room, x) => {
                if (roomData[room] === 0) {
                  return (<div key={`${y}_${x}`} className="zero-field"></div>)
                } else if (roomData[room] === 1) {
                  return (
                    <div key={`${y}_${x}`} className={`room r${room}${(gameData.room.id === room ? " player" : '')}`}>
                      <img src="map/room1.png" width="100%" alt={'Room ' + room} />
                      {showRoomDirections(roomInfo[room], x, y)}
                      {gameData.room.id === room ? <img src="map/characterIdle.gif" id="character" alt="charactermodel" /> : null}
                    </div>)
                } else if (roomData[room] === 2) {
                  return (
                    <div key={`${y}_${x}`} className={`room r${room}${(gameData.room.id === room ? " player" : '')}`}>
                      <img src={'map/room2_' + (roomInfo[room].x === x ? 'left' : 'right') + '.png'} width="100%" alt={'Room ' + room} />
                      {showRoomDirections(roomInfo[room], x, y)}
                      {gameData.room.id === room ? <img src="map/characterIdle.gif" id="character" alt="charactermodel"/> : null}
                    </div>)
                } else if (roomData[room] === 3) {
                  return (
                    <div key={`${y}_${x}`} className={`room r${room}${(gameData.room.id === room ? " player" : '')}`}>
                      <img src={'map/room3_' + (roomInfo[room].y === y ? 'top' : 'bottom') + '.png'} width="100%" alt={'Room ' + room} />
                      {showRoomDirections(roomInfo[room], x, y)}
                      {gameData.room.id === room ? <img src="map/characterIdle.gif" id="character" alt="charactermodel"/> : null}
                      
                    </div>)
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
