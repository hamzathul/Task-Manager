import { useSelector } from "react-redux";

import Signup from "./pages/Signup"
import { Route, Routes } from "react-router-dom";


function App() {

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App
