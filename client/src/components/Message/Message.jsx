import ReactEmoji from 'react-emoji';
import "./Message-dist.css";

export default function Message({ message: { user, text }, name }) {
  let isSentByCurrentUser = false;
  const trimName = name.trim().toLowerCase();
  if (user === trimName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimName}:</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <p className={`sentText pl-10 ${user==='admin' ? "cursiva": ""}`}>{user}:</p>
      <div className={`messageBox ${user==='admin' ? "cursiva": "backgroundLight"}`}>
        <p className={`messageText ${user==='admin' ? "colorGray": "colorDark"}`}>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  );
}
