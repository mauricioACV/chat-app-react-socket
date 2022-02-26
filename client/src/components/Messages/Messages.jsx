import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';
import "./Messages-dist.css";

export default function Messages({ messages, name }) {
  return (
    <ScrollToBottom className='messages'>
      {messages.map((message, index) => (
        <div key={index}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
}
