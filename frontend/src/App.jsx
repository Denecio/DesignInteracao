import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drawing from './pages/mobile/Drawing';
import EnterRoom from './pages/mobile/EnterRoom';
import InfoGiver from './components/InfoGiver';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/drawing" element={<Drawing />} />
        <Route path="/" element={<EnterRoom />} />
        <Route path="/info" element={<InfoGiver text="ID da Sala" role="Digite o ID da sala"/>} />
      </Routes>
    </Router>
  )
}

export default App
