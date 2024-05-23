import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function MessengerPage() {
  const [error, setError] = useState("");
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h1>Messenger Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
