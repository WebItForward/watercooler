import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import PrivateRoute from "../../components/PrivateRoute";
import HomePage from "../HomePage/HomePage";
import MessengerPage from "../MessengerPage/MessengerPage";
import ProfilePage from "../ProfilePage/ProfilePage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/messenger" element={<MessengerPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
