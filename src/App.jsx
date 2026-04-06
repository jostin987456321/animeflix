import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

// src\styles\components\Layout\layout.jsx

import Home from "./pages/Home";
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
    </>
  )
}

export default App
