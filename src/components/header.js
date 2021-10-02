import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Header() {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="header">
      <div>
        <h1 className="logo">
          <Link className="logo" to="/">
            EVRE
          </Link>
        </h1>
      </div>
      <div>
        <Button>
          <Link className="device_logs" to="/devicelogs">
            Device Logs
          </Link>
        </Button>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
export default Header;
