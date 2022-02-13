import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import './WelcomeRoom.css'

export default function WelcomeRoom({ location }) {
  const [nickname, setNickname] = useState(null);
  const [room, setRoom] = useState("");

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    setNickname(name);
  }, [location]);

  return (
    <div className="welcome-container">
      <div className="welcome-left-container">
        <h1 className="welcome-user-title">¡Bienvenido {nickname}!</h1>
        <div className="joinInnerContainer">
            <div>
              <input
                className="joinInput fs-kalam"
                type="text"
                placeholder="crea una nueva sala"
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
            <Link
              onClick={(e) => (!nickname || !room ? e.preventDefault() : null)}
              to={`/chat?name=${nickname}&room=${room}`}
            >
              <button className="button mt-20" type="submit">
                Crear y acceder
              </button>
            </Link>
          </div>
      </div>
      <div className="welcome-right-container"></div>
    </div>
  );
}
