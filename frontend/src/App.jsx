import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drawing from './components/Drawing';
import EnterRoom from './pages/mobile/EnterRoom';
import DrawingPage from './pages/mobile/DrawingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/components" element={<Drawing />} />
        <Route path="/" element={<EnterRoom />} />
        <Route path="/DrawingPage" element={<DrawingPage />} />
      </Routes>
    </Router>
  )
}

export default App
