import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    let { name, value } = event.target;
    console.log(`${name}: ${value}`);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      delete formData.confirmPassword;
      const response = await apiService.signup(formData);
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
        <form onSubmit={handleSignup}>
          <Grid mb={2}>
            <FormLabel component="legend">Username</FormLabel>
            <TextField
              id="standard-basic"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              sx={{ width: "60%" }}
            />
          </Grid>
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
          <Grid mb={2}>
            <FormLabel component="legend">Confirm Password</FormLabel>
            <TextField
              id="standard-basic"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              sx={{ width: "60%" }}
            />
          </Grid>
          <Grid mt={2}>
            <Button
              type="submit"
              variant="contained"
              disabled={formData.password !== formData.confirmPassword}
              color="primary"
            >
              Signup
            </Button>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default SignupForm;
