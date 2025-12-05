import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import {
    NavLink
} from "react-router-dom";
import './AdminHeader.scss';
import * as action from '../../store/actions/userAction';
import { persistor } from "../../redux";

class AdminPage extends React.Component {

    handleLogoutAdmin = () => {
        this.props.processLogout();
        persistor.purge();
        this.props.history.push("/login");

    }
    render() {

        return (
            <div className="admin-container">
                <div className="admin-header">
                    <div className="left-nav">

                        <NavLink to="/system-administrator-users" activeClassName="active" exact={true}>
                            Manage Users
                        </NavLink>
                        <NavLink to="/system-administrator-documents" activeClassName="active">
                            Manage Documents
                        </NavLink>
                    </div>
                    <div className="right-nav">
                        <span onClick={() => this.handleLogoutAdmin()}><i className="fa-solid fa-right-from-bracket"></i></span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(action.processLogout())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminPage));