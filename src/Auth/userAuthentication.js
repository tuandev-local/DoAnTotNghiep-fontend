import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";



export const isAuthenticated = () => {
    let token = localStorage.getItem('persist:root');

    if (!token) {
        return false;
    }
    else {
        return true;
    }
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
)

export default withRouter(ProtectedRoute);
