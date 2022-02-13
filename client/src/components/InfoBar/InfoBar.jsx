import "./InfoBar.css";

export default function InfoBar({ room, users }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img
          className="onlineIcon"
          src={require("../../icons/onlineIcon.png")}
          alt="online"
        />
        <img className="usersIcon" src={require("../../icons/users.svg").default} alt="" />
        <div className="userCounter">2</div>
        <div className="usersContainer">
              {users.map(({ name }) => (
                <div key={name} className="userActive">
                  <img alt="Online Icon" src={require("../../icons/onlineIcon.png")} />
                  {name}
                </div>
              ))}
          </div>
      </div>
      <div className="centerInnerContainer">
        <h3>{ room }</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={require("../../icons/closeIcon.png")} alt="close" />
        </a>
      </div>
    </div>
  );
}
