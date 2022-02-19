import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../../Data/endpoint";
import Cube from "../Cube/Cube";
import "./Join.css";

let socket;

export default function Join() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");

  console.log(users);

  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  useEffect(() => {
    socket.emit("getUsers", () => {});
    socket.on("usersList", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const existingName = () => {
    const usersNames = users.map(user=>user.name);
    const validName = usersNames.includes(name);
    return validName;
  }

  return (
    <div className="joinContainer">
      <div className="leftContainer">
        <div className="leftContent relative">
          <img
            src={require("../../imgs/png/chat-bubble-boom.png")}
            className="boom-bubble absolute"
            alt=""
          />
          <div className="appTitle">
            <p className="tag-title fs-kalam">&#60;</p>
            <h1 className="heading fs-kalam">CHAT APPLICATION</h1>
            <p className="tag-title fs-kalam">&#47;&#62;</p>
          </div>
          <div className="border-b"></div>
          <div className="logoContainer">
            <Cube />
            <h2 className="heading fw300">mauro.dev</h2>
          </div>
        </div>
      </div>
      <div className="rightContainer">
        <div className="joinOuterContainer">
          <div className="joinInnerContainer relative">
          <img
            src={require("../../imgs/png/chat-bubble-boom.png")}
            className="boom-bubble2 absolute"
            alt=""
          />
            <input
              className="joinInput fs-kalam"
              type="text"
              placeholder="¡escribe un nickname!"
              onChange={(e) => setName(e.target.value)}
            />
            <Link
              onClick={(e) => (existingName() || !name ? e.preventDefault() : null)}
              to={`/welcomeroom?name=${name}`}
            >
              <button className="button mt-20" type="submit">
                ✨ingresar✨
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
