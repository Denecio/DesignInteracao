import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drawing from './pages/mobile/Drawing';
import EnterRoom from './pages/mobile/EnterRoom';
import InfoGiver from './components/InfoGiver';
import FinalFrames from './components/FinalFrames';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/drawing" element={<Drawing />} />
        <Route path="/" element={<EnterRoom />} />
        <Route path="/arrangeframes" element={<FinalFrames number="1" />} />
      </Routes>
    </Router>
  )
}

export default App
