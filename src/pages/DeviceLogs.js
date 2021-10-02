import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
export default function DeviceLogs() {
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  return (
    <Box sx={{ my: 4 }}>
      <Box>
        <div className="header_staff">
          <div>
            <p>Device Logs</p>
          </div>
          <div></div>
        </div>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <thead>
              <tr>
                <th>Staff Id</th>
                <th>Device Id</th>
                <th>Logs Id</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td></td>
              </tr> */}
            </tbody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
