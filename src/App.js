import logo from './logo.svg';
import './App.css';
// AI tools chatbot predefined questions in react
import Chatbot from './Components/ChatbotComponent';
import { Header } from './Components/Header';
import  Footer  from './Components/Footer';
function App() {
  return (
    <div className="App">
     <Header />
     <Chatbot/>
     {/* <Footer /> */}
    </div>
  );
}

export default App;
