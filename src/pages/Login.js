import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const history = useHistory();
  let token = localStorage.getItem("token");

  if (token) {
    history.push("/");
  }

  const close = () => {
    setError(false);
    setErrormsg("");
  };

  async function submitLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `https://evre.wielabs.tech/api/v1/admin/login`,
        { email, password }
      );
      await localStorage.setItem("token", res.data.token);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      setErrormsg(error?.response?.data.err);
      setError(true);
    }
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <form onSubmit={submitLogin}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            {error && (
              <Alert
                severity="warning"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={close}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {errormsg && errormsg}
              </Alert>
            )}
          </Grid>
          <Grid item>
            <h1 className="logo">EVRE</h1>
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              Admin Login
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="outlined-password-input"
              label="Email"
              type="text"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              id="outlined-adornment-password"
              size="small"
              label="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          <Grid item>
            {loading ? (
              <Button variant="contained" fullWidth disabled>
                Loading ...
              </Button>
            ) : (
              <Button
                variant="contained"
                type="submit"
                style={{ color: "white", backgroundColor: "green" }}
                fullWidth
              >
                Login
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
