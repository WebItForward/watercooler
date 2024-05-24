import { useState } from "react";
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

export default function ProfilePage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const { user, logout } = useAuth(); // Destructure logout from useAuth

  // Handle file change event
  function handleFileChange(evt) {
    setFile(evt.target.files[0]);
  }

  // Handle file upload
  async function handleFileUpload() {
    if (!file) {
      setError("Please select a file.");
      return;
    }
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/profile/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded successfully", data.url);
      } else {
        throw new Error("Upload failed.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <Container>
        <h1>{user.firstName}'s Profile Page</h1>
        <Card sx={{ mt: 5 }}>
          <CardContent sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {user.photoUrl ? (
                <img src={`${user.photoUrl}`} alt="Profile" />
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
        </Button>{" "}
        {/* Replace button with MUI Button */}
      </Container>
    </>
  );
}
