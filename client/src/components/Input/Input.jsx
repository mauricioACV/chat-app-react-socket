import "./Input-dist.css";

export default function Input({ message, setMessage, sendMessage }) {
  return (
    <form className="form" action="">
      <input
        className="input"
        type="text"
        placeholder="Escribe un mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <button className="sendButton" onClick={(e) => sendMessage(e)}>Enviar</button>
    </form>
  );
}
