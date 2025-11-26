import { connect } from "react-redux";
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { adminAuth } from "../services/userServices";

class ProtectedAdminRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: null
        };
    }

    componentDidMount() {
        this.checkToken();
    }

    checkToken = async () => {
        const { token } = this.props;

        if (!token) {
            this.setState({ valid: false });
            return;
        }

        try {
            const res = await adminAuth(token);
            if (res && res.data.verify === true) {
                this.setState({ valid: true });
            }
            else {
                this.setState({ valid: false });
            }

        } catch (error) {
            this.setState({ valid: false });
        }
    };

    render() {
        const { component: Component, ...rest } = this.props;
        const { valid } = this.state;

        if (valid === null) {
            return <div>Loading.....</div>;
        }

        return (
            <Route
                {...rest}
                render={(props) =>
                    valid ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/" />
                    )
                }
            />
        );
    }
}


const mapStateToProps = (state) => ({
    token: state.user.token
});

export default connect(mapStateToProps)(ProtectedAdminRoute);

