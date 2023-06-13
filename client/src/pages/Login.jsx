import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import authApi from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const handleSubmit = async (e) => { //1
    e.preventDefault();  
    setUsernameErrText(""); //2
    setPasswordErrText(""); //3

    const data = new FormData(e.target);  //4
    const username = data.get("username").trim();  //5
    const password = data.get("password").trim(); //6

    let err = false;

    if (username === "") {  //7
      err = true; 
      setUsernameErrText("Please fill this field");  //8
    }
    if (password === "") { //9
      err = true;
      setPasswordErrText("Please fill this field");  //10
    }

    if (err) return; //11

    setLoading(true); //12

    try {  //13
      const res = await authApi.login({ username, password });//14
      setLoading(false);//15
      localStorage.setItem("token", res.token);//16
      navigate("/"); //17
    } catch (err) {  //18
      const errors = err.data.errors;//19
      errors.forEach((e) => {//20
        if (e.param === "username") { //21
          setUsernameErrText(e.msg);//22
        }
        if (e.param === "password") {  //23
          setPasswordErrText(e.msg);  //24
        }
      });
      setLoading(false); //25
    }
  };

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Usuario"
          name="username"
          disabled={loading}
          error={usernameErrText !== ""}
          helperText={usernameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Contraseña"
          name="password"
          type="password"
          disabled={loading}
          error={passwordErrText !== ""}
          helperText={passwordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Iniciar Sesión
        </LoadingButton>
      </Box>
      <Button component={Link} to="/signup" sx={{ textTransform: "none" }}>
        No tienes contraseña? Registrate
      </Button>
    </>
  );
};

export default Login;
