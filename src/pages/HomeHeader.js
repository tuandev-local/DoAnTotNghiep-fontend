import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import * as action from '../store/actions/userAction';
import './HomeHeader.scss';
import {
    Link
} from "react-router-dom";
import { persistor } from "../redux";

class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
        }
    }

    componentDidMount() {
        this.setState({
            userData: this.props.dataUser
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataUser !== this.props.dataUser) {
            this.setState({
                userData: this.props.dataUser
            })
        }

    }

    handleLogOut = () => {

        this.props.processLogout();
        persistor.purge();
        this.props.history.push("/login");
    }

    handleToHomePage = () => {
        this.props.history.push("/");
    }

    handleRedirectUpload = () => {
        this.props.history.push("/auth/upload-document");
    }

    handleRedirectFavour = () => {
        this.props.history.push("/auth/favourites-document");
    }

    handleRedirectSearch = () => {
        this.props.history.push("/auth/find-document");
    }
    render() {

        let { userData } = this.state;

        return (
            <React.Fragment>
                <div className="header-contain-all">
                    <div className="header-section">
                        <div className="header-study-logo" onClick={() => this.handleToHomePage()}></div>

                        <div className="header-content">
                            <div className="header-content-list">
                                <div className="list-item">
                                    <div className="list-item-icon"><i className="fa-solid fa-magnifying-glass-plus"></i></div>
                                    <div className="list-item-title" onClick={() => this.handleRedirectSearch()}>Find Documents</div>
                                </div>
                                <div className="list-item">
                                    <div className="list-item-icon"><i className="fa-solid fa-bookmark"></i></div>
                                    <div className="list-item-title" onClick={() => this.handleRedirectFavour()}>Favourites</div>
                                </div>
                                <div className="list-item">
                                    <div className="list-item-icon"><i className="fa-solid fa-arrow-up-from-bracket"></i></div>
                                    <div className="list-item-title" onClick={() => this.handleRedirectUpload()}>Upload Documents</div>
                                </div>

                            </div>
                        </div>

                        <div className="header-account">

                            <div className="header-username">
                                <Link className='Link' to="/auth/update-user" >
                                    Welcome {userData ? userData.firstName : ''}
                                </Link>
                            </div>
                            <div className="logout">
                                <span onClick={() => this.handleLogOut()}><i className="fa-solid fa-right-from-bracket"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataUser: state.user.userInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

        processLogout: () => dispatch(action.processLogout())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeHeader));