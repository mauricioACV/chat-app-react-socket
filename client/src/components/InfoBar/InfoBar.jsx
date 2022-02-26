import "./InfoBar-dist.css";

export default function InfoBar({ room, users }) {
  return (
    <div className="infoBar">
      <input type="checkbox" id="check-user-menu" />
      <OnlineUsersList users={users} />
      <div className="leftInnerContainer">
        <img
          className="onlineIcon"
          src={require("../../icons/onlineIcon.png")}
          alt="online"
        />
        <label htmlFor="check-user-menu">
          <img
            className="usersIcon"
            src={require("../../icons/users.svg").default}
            alt=""
          />
          <div className="userCounter">{users.length}</div>
        </label>
      </div>
      <div className="centerInnerContainer">
        <h3>{room.toUpperCase()}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={require("../../icons/closeIcon.png")} alt="close" />
        </a>
      </div>
    </div>
  );
}

function OnlineUsersList({ users }) {
  return (
    <div className="usersContainer">
      <div className="usersHeader">
        <h2 className="usersTitle fw300">Online Users</h2>
        <label htmlFor="check-user-menu">
        <img
          className="close-users"
          src={require("../../imgs/svg/close-menu-users.svg").default}
          alt="avatar"
        />
        </label>
      </div>
      {users.map(({ name, avatar }) => (
        <div key={name} className="userItem mt-10">
          <div className="itemDetails">
            <img
              className="avatarIcon"
              src={require(`../../imgs/avatars/${avatar}.png`)}
              alt="avatar"
            />
            <p className="fw300 ml-10">{name}</p>
          </div>
          <img alt="OnlineIcon" src={require("../../icons/onlineIcon.png")} />
        </div>
      ))}
    </div>
  );
}
