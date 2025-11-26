import React from "react";
import './Register.scss';
import {
    Link
} from "react-router-dom";
import { sigUpUser, getAllCode } from '../services/userServices';
import { withRouter } from "react-router";
import { toast } from "react-toastify";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            role: '',
            showPassword: false,
            errMessage: '',
        }
    }

    async componentDidMount() {
        try {

            let response = await getAllCode('ROLE');
            if (response && response.data.errCode === 0) {
                let dataRole = response.data.datatype;
                console.log('check data role: ', dataRole)
                this.setState({

                    role: dataRole && dataRole.length > 0 ? dataRole[1].key : ''

                })

            }
            else {
                console.log(response.data.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }


    hanleShowHidePassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleOnchangeInput = (event, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = event.target.value;
        this.setState({
            ...coppyState,

        })

    }

    checkInput = () => {
        let check = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'phonenumber'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                console.log(arrInput[i]);
                check = false;
                alert('Missing ' + arrInput[i]);
                break;
            }
        }
        return check;
    }

    handleRegister = async () => {
        let data = this.state;
        let isValid = this.checkInput();
        if (isValid === true) {
            try {
                let response = await sigUpUser(data);

                if (response && response.data.errCode !== 0) {
                    this.setState({
                        errMessage: response.data.errMessage
                    })
                }
                else {
                    toast.success("Register Successful!")
                    this.props.history.push("/login");
                }


                console.log('check response: ', response.data);

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

    }
    render() {

        return (
            <div className="sign-up-all">
                <div className="box-contain">
                    <div className="containers">
                        <div className="form-header">
                            <h1>Register</h1>
                            <p>Please fill in this form to create an account.</p>
                        </div>

                        <div className="input-form">
                            <label><b>Email</b></label>
                            <input type="text" placeholder="Enter Email" value={this.state.email} className="inputInfo" onChange={(event) => this.handleOnchangeInput(event, 'email')} />
                        </div>

                        <div className="input-form">
                            <label><b>Password</b></label>
                            <input type={this.state.showPassword ? 'text' : 'password'} placeholder="Enter Password" value={this.state.password} className="inputInfo" onChange={(event) => this.handleOnchangeInput(event, 'password')} />
                            <span className="icon-sign" onClick={() => this.hanleShowHidePassword()}><i className={this.state.showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i></span>
                        </div>

                        <div className="input-form">
                            <label><b>First Name</b></label>
                            <input type="text" placeholder="Enter First Name" value={this.state.firstName} className="inputInfo" onChange={(event) => this.handleOnchangeInput(event, 'firstName')} />
                        </div>

                        <div className="input-form">
                            <label><b>Last Name</b></label>
                            <input type="text" placeholder="Enter Last Name" value={this.state.lastName} className="inputInfo" onChange={(event) => this.handleOnchangeInput(event, 'lastName')} />
                        </div>

                        <div className="input-form">
                            <label><b>Phonenumber</b></label>
                            <input type="text" placeholder="Enter phonenumber" value={this.state.phonenumber} className="inputInfo" onChange={(event) => this.handleOnchangeInput(event, 'phonenumber')} />
                        </div>

                        <div className="form-outline">
                            <div className="alert">
                                {this.state.errMessage}
                            </div>


                        </div>

                        <button type="submit" className="registerbtn" onClick={() => this.handleRegister()}>Register</button>

                    </div>

                    <div className="signin">
                        <p>Already have an account? <Link style={{ color: 'blue' }} to="/login">Sign in</Link></p>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(Register);