import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import DefaultProfileImage from "../../images/DefaultProfileImage.png";
import { getAvatarUrl, uploadAvatar } from "../../utilities/profile";

export default function ProfilePage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");
  const { user, logout } = useAuth();

  useEffect(() => {
    async function fetchAvatarUrl() {
      try {
        const response = await getAvatarUrl();
        setAvatarUrl(response.url);
      } catch (error) {
        console.error("Error fetching avatar URL...", error);
      }
    }
    fetchAvatarUrl();
  }, []);

  function handleFileChange(evt) {
    setFile(evt.target.files[0]);
  }

  async function handleFileUpload(evt) {
    evt.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadAvatar(formData);
      setAvatarUrl(response.url);
      console.log("File uploaded successfully", response.url);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Container>
      <h1>{user.firstName}'s Profile Page</h1>
      <Card sx={{ mt: 5 }}>
        <CardContent sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" style={{ width: "20rem" }} />
            ) : (
              <img
                src={DefaultProfileImage}
                alt="Default Profile"
                style={{ width: "20rem" }}
              />
            )}
            <form onSubmit={handleFileUpload}>
              <input type="file" name="file" onChange={handleFileChange} />
              <Button type="submit" disabled={uploading} sx={{ mt: 2 }}>
                {uploading ? "Uploading..." : "Upload Photo"}
              </Button>
              {error && <Typography color="error">{error}</Typography>}
            </form>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h2" sx={{ marginLeft: "auto" }}>
              {user.firstName}
            </Typography>
            <Typography variant="h2">{user.lastName}</Typography>
          </Box>
        </CardContent>
      </Card>
      <Button onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Container>
  );
}
