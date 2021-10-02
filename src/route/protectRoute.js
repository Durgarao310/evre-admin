import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";


function ProtectRoute({ children, ...rest }) {
    let token = localStorage.getItem('token')
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectRoute