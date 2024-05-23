import { useState } from "react";
import { Box, Button, FormGroup, Grid, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as usersApi from "../../utilities/users-api";

export default function SignUpForm({ handleChangeLoginView }) {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value,
    });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersApi.signUp(credentials);
      setCredentials(user);
      navigate("/messenger");
    } catch (error) {
      setError(error);
    }
  }
  return (
    <>
      <Box
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
          <form onSubmit={handleSubmit}>
            <FormGroup sx={{ m: 3 }}>
              <TextField
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup sx={{ m: 3 }}>
              <TextField
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup sx={{ m: 3 }}>
              <TextField
                type="text"
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
            <Button
              type="submit"
              variant="outlined"
              sx={{ width: "90%", mt: 1 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid
                item
                sx={{ m: "auto", mt: 3 }}
                onClick={handleChangeLoginView}
              >
                {"Already have an account?"}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
}
