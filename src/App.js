import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard/dashboard";

import "./App.css";

function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      
    </div>
  );
}

export default App;
