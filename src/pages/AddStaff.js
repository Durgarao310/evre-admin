import React, { useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";

export default function AddStaff() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const history = useHistory();
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const close = () => {
    setError(false);
    setErrormsg("");
  };

  async function submitLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `https://evre.wielabs.tech/api/v1/staff/register`,
        { email, fullName, phone },
        config
      );
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      setErrormsg("email alredy exist or phone number must be 10 numbers");
      setError(true);
    }
  }
  return (
    <div className="add_staff_parent">
      <Box>
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
      </Box>
      <form onSubmit={submitLogin}>
        <div className="update_staff_header">
          <h4>Add Staff</h4>
        </div>
        <div className="input_main">
          <label>Email:</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@gmail.com"
          />
        </div>
        <div className="input_main">
          <label>Name:</label>
          <input
            className="input"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="full name"
            required
          />
        </div>
        <div className="input_main">
          <label>Phone:</label>
          <input
            className="input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="mobile number"
            required
          />
        </div>
        <div className="input_main">
          {loading ? (
            <Button variant="contained" disabled>
              Loafing ...{" "}
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: "green", color: "white" }}
            >
              submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
