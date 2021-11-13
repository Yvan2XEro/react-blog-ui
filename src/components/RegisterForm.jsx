import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "./Copyright";
import { isValiEmail } from "../services/validators";
import { register } from "../services/userServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate()
  const [userInputs, setUserInputs] = useState({
    name: "", email: "", password: ""
  })

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(userInputs.name.length>3 && userInputs.password.length>4 && isValiEmail(userInputs.email)) {
      await register(userInputs).then(()=>{
        toast.success("Register success!")
        navigate("/login")
      }).catch(()=>{
        toast.error("An error occured!")
      })
    }
  }
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            onChange={({target})=>setUserInputs({...userInputs, name: target.value})}
            variant="standard"
            label="Full Name"
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            onChange={({target})=>setUserInputs({...userInputs, email: target.value})}
            fullWidth
            variant="standard"
            id="email"
            label="Email Address"
            name="email"
          />
          <TextField
            margin="normal"
            required
            onChange={({target})=>setUserInputs({...userInputs, password: target.value})}
            fullWidth
            name="password"
            label="Password"
            variant="standard"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid>
  );
}

export default RegisterForm;
