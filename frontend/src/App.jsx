import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drawing from './pages/mobile/Drawing';
import EnterRoom from './pages/mobile/EnterRoom';
import WaitingRoom from './pages/desktop/WaitingRoom';
import InfoGiver from './components/infogiver';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/drawing/:id" element={<Drawing />} />
        <Route path="/" element={<EnterRoom />} />
        <Route path="/room/:id" element={<WaitingRoom />} />
      </Routes>
    </Router>
  )
}

export default App
