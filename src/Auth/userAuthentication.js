import { connect } from "react-redux";
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { userAth } from "../services/userServices";
class ProtectedRoute extends Component {
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
            const res = await userAth(token);
            if (res && res.data.verify === true) {
                this.setState({ valid: res.data.verify });
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
                        <Redirect to="/login" />
                    )
                }
            />
        );
    }
}


const mapStateToProps = (state) => ({
    token: state.user.token
});

export default connect(mapStateToProps)(ProtectedRoute);

