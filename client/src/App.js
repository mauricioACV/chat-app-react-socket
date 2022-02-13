import {BrowserRouter as Router, Route} from 'react-router-dom';
import Join from './components/Join/Join';
import WelcomeRoom from './components/WelcomeRoom/WelcomeRoom';
import Chat from './components/Chat/Chat';

function App() {
  return (
      <Router>
          <Route path="/" exact component={Join}/>
          <Route path="/welcomeRoom" component={WelcomeRoom}/>
          <Route path="/chat" component={Chat}/>
      </Router>
  );
}

export default App;
