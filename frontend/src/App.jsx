import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drawing from './pages/mobile/Drawing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/drawing" element={<Drawing />} />
      </Routes>
    </Router>
  )
}

export default App
