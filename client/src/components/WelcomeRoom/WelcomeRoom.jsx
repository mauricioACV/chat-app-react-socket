import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import queryString from "query-string";
import { avatars } from "../../Data/avatars";
import "./WelcomeRoom.css";

let socket;

export default function WelcomeRoom({ location }) {
  const [nickname, setNickname] = useState(null);
  const [userAvatar, setuserAvatar] = useState(null);
  const [roomUser, setRoomUser] = useState("");
  const [rooms, setRooms] = useState(null);
  const ENDPOINT = "localhost:5000";

  console.log(rooms);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("getRooms", () => {});
    socket.on("roomsList", ({ rooms }) => {
      console.log(rooms);
      setRooms(rooms);
    });
  }, [ENDPOINT]);

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    setNickname(name);
  }, [location]);

  return (
    <div className="welcome-container">
      <div className="welcome-left-container">
        <div className="titleContainer">
          <p className="tag-title">&#60;</p>
          <h1 className="welcome-user-title ml-10 mr-10">
            ¡Bienvenido {nickname}!
          </h1>
          <p className="tag-title">&#62;</p>
        </div>
        <h2 className="welcome-user-title">Escoge un avatar</h2>
        <div className="avatarContainer">
          {avatars.map((avatar) => (
            <div
              className={`avatarOption ${
                userAvatar === avatar ? "avatarActive" : ""
              }`}
              key={avatar}
            >
              <img
                onClick={() => setuserAvatar(avatar)}
                src={require(`../../imgs/avatars/${avatar}.png`)}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
      <div className="welcome-right-container">
        <h2 className="welcome-user-title">Puedes crear una sala</h2>
        <div className="welcomeInnerContainer">
          <input
            className="welcomeInput fs-kalam"
            type="text"
            placeholder="nombre nueva room"
            onChange={(e) => setRoomUser(e.target.value.toLowerCase())}
          />
        </div>
        <div className="roomsOuterContainer">
          <h2 className="welcome-user-title">
            Puedes acceder a salas activas en este momento
          </h2>
          <div className="roomsContainer">
            {rooms &&
              rooms.map((room, index) => (
                <div
                  className={`roomItem ${
                    roomUser === room ? "avatarActive" : ""
                  }`}
                  onClick={() => setRoomUser(room.toLowerCase())}
                >
                  <div className="roomImg">
                    <img
                      src={require(`../../imgs/png/${room}.png`)}
                      alt="room avatar"
                    />
                  </div>
                  <div className="roomContent">
                    <h3 key={room}>{room}</h3>
                    <p>room</p>
                    <h2 className="roomRank">
                      <small>#</small>
                      {index + 1}
                    </h2>
                  </div>
                </div>
              ))}
          </div>
          <Link
          className="linkBtn"
            onClick={(e) =>
              !nickname || !roomUser || !userAvatar ? e.preventDefault() : null
            }
            to={`/chat?name=${nickname}&room=${roomUser}&avatar=${userAvatar}`}
          >
            <button className="button w-70 mt-20" type="submit">
              Entrar a sala
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
