import { useDispatch, useSelector } from "react-redux";

import Signup from "./pages/Signup"
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { checkAuth } from "./redux/actions/authActions";


function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  console.log(user)

  useEffect(() => {
    dispatch(checkAuth()); // Check authentication on page load
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to={"/"} />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to={"/"} />}
      />
      <Route path="/" element={user?<Dashboard />:<Navigate to={'/login'}/>} />
    </Routes>
  );
}

export default App
