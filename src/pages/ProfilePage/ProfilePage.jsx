import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const { logout } = useAuth();
  return (
    <>
      <h1>Profile Page {user.firstName}</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}
