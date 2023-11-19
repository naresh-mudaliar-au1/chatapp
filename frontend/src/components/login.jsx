import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  FormLabel,
  Button,
  Box,
  Grid,
  Container,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import apiService from "../services/api.service";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.login(formData);
      if (response.error) {
        throw new Error(response.data.message);
      }
      setAlert({
        type: "success",
        message: response.message,
        color: "success",
      });
      navigate("/login");
    } catch (error) {
      console.log("error", error);
      setAlert({
        type: "error",
        message: error.message,
        color: "error",
      });
    }
  };
  const handleChange = (event) => {
    let { name, value } = event.target;
    console.log(`${name}: ${value}`);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Container>
        {alert && (
          <Alert mb={2} severity={alert.type} color={alert.color}>
            {alert.message}
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <Grid mb={2}>
            <FormLabel component="legend">Email</FormLabel>
            <TextField
              id="standard-basic"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ width: "60%" }}
            />
          </Grid>
          <Grid mb={2}>
            <FormLabel component="legend">Password</FormLabel>
            <TextField
              id="standard-basic"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ width: "60%" }}
            />
          </Grid>
          <Grid mt={2}>
            <Button
              type="submit"
              variant="contained"
              disabled={!formData.password.length}
              color="primary"
            >
              Login
            </Button>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default LoginForm;
