import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormGroup, Grid, Paper, TextField } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm({ handleChangeLoginView }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(evt) {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value,
    });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(credentials);
      navigate("/messenger");
    } catch (error) {
      setError(error);
    }
  }
  return (
    <>
      <Box
        component="form"
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <Paper sx={{ p: 5, width: "50%" }}>
          <FormGroup sx={{ m: 3 }}>
            <TextField
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup sx={{ m: 3 }}>
            <TextField
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </FormGroup>
          <Grid container>
            <Grid
              item
              sx={{ m: "auto", mt: 3 }}
              onClick={handleChangeLoginView}
            >
              {"Need an account?"}
            </Grid>
          </Grid>
          <Button type="submit" variant="outlined" sx={{ width: "90%", mt: 3 }}>
            Login
          </Button>
        </Paper>
      </Box>
    </>
  );
}
