import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drawing from './pages/mobile/Drawing';
import EnterRoom from './pages/mobile/EnterRoom';
import ArrangeFrames from './pages/mobile/ArrangeFrames';
import WaitingRoom from './pages/desktop/WaitingRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/drawing/:id" element={<Drawing />} />
        <Route path="/" element={<EnterRoom />} />
        <Route path="/ArrangeFrames" element={<ArrangeFrames />} />
        <Route path="/room/:id" element={<WaitingRoom />} />
      </Routes>
    </Router>
  )
}

export default App
