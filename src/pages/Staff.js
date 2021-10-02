import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditTwoToneIcon from "@mui/icons-material/ModeEditTwoTone";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";

export default function Staff() {
  const [users, setUsers] = useState([]);
  const [ploading, setPloading] = useState(false);
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    staff();
  }, []);

  const close = () => {
    setError(false);
    setErrormsg("");
  };

  const staff = async () => {
    try {
      setPloading(true);
      const resp = await axios.get(
        `https://evre.wielabs.tech/api/v1/staff/all`,
        config
      );
      setUsers(resp.data.res);
      setPloading(false);
    } catch (error) {
      setPloading(false);
      setErrormsg("please, try agin!");
      setError(true);
    }
  };

  const delStaff = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `https://evre.wielabs.tech/api/v1/staff/${id}`,
        config
      );
      setLoading(false);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setLoading(false);
      setErrormsg("please, try agin!");
      setError(true);
    }
  };

  return (
    <Box sx={{ my: 4 }}>
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
      <Box>
        <div className="header_staff">
          <div>
            <p>Staff List</p>
          </div>
          <div>
            <Link to="/addstaff">
              <Button endIcon={<AddCircleIcon />}>Staff</Button>
            </Link>
          </div>
        </div>
      </Box>

      {ploading ? (
        <Box>loading...</Box>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      {user.fullName && (
                        <div className="user_modify_btns">
                          <div className="ml-4">
                            {loading ? (
                              <>loading ...</>
                            ) : (
                              <DeleteIcon
                                onClick={() => delStaff(user._id)}
                                style={{ color: "red", opacity: "0.6" }}
                              />
                            )}
                          </div>
                          <div className="ml-4">
                            <Link to={`${user._id}`}>
                              <ModeEditTwoToneIcon
                                style={{ color: "blue", opacity: "0.9" }}
                              />
                            </Link>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}
