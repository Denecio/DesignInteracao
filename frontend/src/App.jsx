import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterRoom from './pages/mobile/EnterRoom';
import DrawingPage from './pages/mobile/DrawingPage';
import ArrangeFrames from './pages/mobile/ArrangeFrames';
import WaitingRoom from './pages/desktop/WaitingRoom';
import Loading from './pages/mobile/Loading';
import StoryGiver from './pages/mobile/StoryGiver';
import RoleGiver from './pages/mobile/RoleGiver';
import Final from './pages/desktop/Final';

import socket from './socket';

function App() {
  const isMobile = window.innerWidth < 768;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterRoom socket={socket}/>} />
        <Route path="/room/:id" element={isMobile ? <Loading text="Aguarda que todos os jogadores entrem na Sala" page="story" url="game-started" socket={socket}/> : <WaitingRoom socket={socket}/>} />
        {/*<Route path="/story/:id" element={isMobile ? <StoryGiver socket={socket}/> : <Loading text="Agora que cá estão todos, é hora de olhares para o teu telemóvel" socket={socket}/>} />*/}
        <Route path="/story/:id" element={<StoryGiver socket={socket}/>} />
        <Route path="/role/:id" element={<RoleGiver socket={socket}/>}/>
        {/*<Route path="/role/:id" element={isMobile ? <RoleGiver socket={socket}/> : <Loading text="Agora que cá estão todos, é hora de olhares para o teu telemóvel" socket={socket}/>} />*/}
        <Route path="/drawing/:id" element={<DrawingPage socket={socket}/>} />
        <Route path="/arrange-frames/:id" element={<ArrangeFrames socket={socket}/>} />
        <Route path="/final/:id" element={isMobile ? <Loading text="Olha para o ecrã para principal para veres o resultado final" socket={socket}/> : <Final socket={socket}/>} />
      </Routes>
    </Router>
  )
}

export default App
