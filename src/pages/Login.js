import React from "react";
import './Login.scss';
import {
    Link
} from "react-router-dom";
import { loginUser } from '../services/userServices';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import * as action from '../store/actions/userAction';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false,
            errMessage: '',
        }
    }

    handleOnchangeInputEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnchangeInputPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    hanleShowHidePassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }



    handleLogin = async () => {
        this.setState({
            errMessage: '',
        });

        try {
            let email = this.state.email;
            let password = this.state.password;
            let response = await loginUser(email, password);
            //wrong pass or email or user dont't exist
            if (response && response.data.errCode !== 0) {

                this.setState({
                    errMessage: response.data.errMessage
                })
            }
            //found email && password 
            if (response && response.data.errCode === 0) {
                //store user data in redux
                this.props.userLoginSuccess(response.data.user, response.data.token);
                let role = this.props.userInfo.roleId;
                if (role === "R1") {
                    this.props.history.push("/system-administrator-users");
                }
                else {
                    //push to home page
                    this.props.history.push("/");
                }


            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.errMessage,
                    })
                }
            }
        }

    }



    render() {

        return (

            <div className="login-page">
                <div className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                            <div className="social_icon">
                                <span><i className="fa-brands fa-facebook"></i></span>
                                <span><i className="fa-brands fa-google"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="input-group-form-group">
                                    <div className="form-input">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <div className="input-email">
                                            <input type="email" className="form-control" value={this.state.email} placeholder="Enter your Email" onChange={(event) => this.handleOnchangeInputEmail(event)} />
                                        </div>

                                    </div>


                                </div>
                                <div className="input-group-form-group">
                                    <div className="form-input">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa-solid fa-key"></i></span>
                                        </div>
                                        <div className="input-password">
                                            <input type={this.state.showPassword ? 'text' : 'password'} className="form-control" value={this.state.password} placeholder="Enter your Password"
                                                onChange={(event) => this.handleOnchangeInputPassword(event)}
                                                onKeyDown={(event) => this.handleEnterKey(event)}
                                            />
                                            <span onClick={() => this.hanleShowHidePassword()}
                                            ><i className={this.state.showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i></span>

                                        </div>

                                    </div>

                                </div>
                            </form>
                            {/* display error when hit login button */}
                            <div className='alert'>
                                {this.state.errMessage}
                            </div>
                            <div className="form-group">
                                <button type="submit" className=" login_btn" onClick={() => this.handleLogin()}>Login</button>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="links">
                                Don't have an account?<Link to="/signup" style={{ color: "blue" }}>Sign up</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        token: state.user.token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLoginSuccess: (userInfo, token) => dispatch(action.userLoginSuccess(userInfo, token)),
        userLoginFail: () => dispatch(action.userLoginFail()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));