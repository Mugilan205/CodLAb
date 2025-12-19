import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CodingPage from "./Pages/CodingPage.jsx";
import Home from "./Pages/Home.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Home/>} />

        {/* Coding Page */}
        <Route path="/code" element={<CodingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
