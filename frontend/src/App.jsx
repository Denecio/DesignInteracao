import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Drawing from './components/Drawing';
import EnterRoom from './pages/mobile/EnterRoom';
import DrawingPage from './pages/mobile/DrawingPage';
import ArrangeFrames from './pages/mobile/ArrangeFrames';
import WaitingRoom from './pages/desktop/WaitingRoom';
import Loading from './pages/mobile/Loading';
import StoryGiver from './pages/mobile/StoryGiver';
import RoleGiver from './pages/mobile/RoleGiver';
import backgroundMusic from './assets/sounds/background.mp3'; 


function App() {
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    let BackgroundMusic = new Audio(backgroundMusic);
    BackgroundMusic.volume = 0.05; 
    BackgroundMusic.loop = true; 
    BackgroundMusic.play().catch(error => {
      console.error("Error playing background music:", error);
    });

   
    return () => {
      BackgroundMusic.pause();
      BackgroundMusic.currentTime = 0;
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/DrawingPage" element={<DrawingPage />} />
        <Route path="/drawing/:id" element={<Drawing />} />
        <Route path="/" element={<EnterRoom />} />
        <Route path="/ArrangeFrames/:id" element={<ArrangeFrames />} />
        <Route path="/room/:id" element={isMobile ? <Loading text={"Aguarda que todos os jogadores entrem na Sala"} /> : <WaitingRoom />} />
        <Route path="/story/:id" element={isMobile ? <StoryGiver/> : <Loading text={"Agora que cá estão todos, é hora de olhares para o teu telemóvel"}/>} />
        <Route path="/role/:id" element={isMobile ? <RoleGiver/> : <Loading text={"Agora que cá estão todos, é hora de olhares para o teu telemóvel"}/>} />
      </Routes>
    </Router>
  )
}

export default App
