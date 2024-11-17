import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterRoom from './pages/mobile/EnterRoom';
import DrawingPage from './pages/mobile/DrawingPage';
import ArrangeFrames from './pages/mobile/ArrangeFrames';
import WaitingRoom from './pages/desktop/WaitingRoom';
import Loading from './pages/mobile/Loading';
import StoryGiver from './pages/mobile/StoryGiver';
import RoleGiver from './pages/mobile/RoleGiver';

function App() {
  const isMobile = window.innerWidth < 768;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterRoom />} />
        <Route path="/room/:id" element={isMobile ? <Loading text={"Aguarda que todos os jogadores entrem na Sala"} /> : <WaitingRoom />} />
        <Route path="/story/:id" element={isMobile ? <StoryGiver/> : <Loading text={"Agora que cá estão todos, é hora de olhares para o teu telemóvel"}/>} />
        <Route path="/role/:id" element={isMobile ? <RoleGiver/> : <Loading text={"Agora que cá estão todos, é hora de olhares para o teu telemóvel"}/>} />
        <Route path="/drawing/:id" element={<DrawingPage />} />
        <Route path="/arrange-frames/:id" element={<ArrangeFrames />} />
      </Routes>
    </Router>
  )
}

export default App
