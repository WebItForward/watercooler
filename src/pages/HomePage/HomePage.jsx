import { useState } from "react";
import { Container } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function HomePage() {
  const [loginView, setLoginView] = useState(false);

  function handleChangeLoginView() {
    setLoginView(!loginView);
  }

  return (
    <Container>
      {loginView ? (
        <LoginForm handleChangeLoginView={handleChangeLoginView} />
      ) : (
        <SignUpForm handleChangeLoginView={handleChangeLoginView} />
      )}
    </Container>
  );
}
