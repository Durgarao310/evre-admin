import * as React from 'react';
import Container from '@mui/material/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import Staff from './pages/Staff'
import ProtectRoute from './route/protectRoute';
import Header from './components/header';
import AddStaff from './pages/AddStaff';
import UpdateStaff from './pages/UpdateStaff';


export default function App() {
  let token = localStorage.getItem("token")
  return (
    <>
      <Router>
        {token && <Header />}
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <ProtectRoute exact path="/">
              <Staff />
            </ProtectRoute>
            <ProtectRoute exact path="/addstaff">
              <AddStaff />
            </ProtectRoute>
            <ProtectRoute exact path="/:id">
              <UpdateStaff />
            </ProtectRoute>
          </Switch>
        </Container>
      </Router>
    </>
  );
}
