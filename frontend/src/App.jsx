import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drawing from './pages/mobile/Drawing';
import EnterRoom from './pages/mobile/EnterRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/drawing/:id" element={<Drawing />} />
        <Route path="/" element={<EnterRoom />} />
      </Routes>
    </Router>
  )
}

export default App
