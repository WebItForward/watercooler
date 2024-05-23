import { useState } from "react";
import { Box, Button, FormGroup, Grid, Paper, TextField } from "@mui/material";

export default function LoginForm({ handleChangeLoginView }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(evt) {
    setCredentials({
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    try {
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
          <Button variant="outlined" sx={{ width: "90%", mt: 3 }}>
            Login
          </Button>
        </Paper>
      </Box>
    </>
  );
}
