import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import MessengerPage from "../MessengerPage/MessengerPage";
import ProfilePage from "../ProfilePage/ProfilePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/messenger" element={<MessengerPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
