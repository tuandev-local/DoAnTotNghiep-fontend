import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import './GetUserProfile.scss';
import HomHeader from "../HomeHeader";
import { getUserInfo, handlePutUpdateUser } from '../../services/userServices';
import * as action from '../../store/actions/userAction';
import { toast } from "react-toastify";

class UserProfile extends React.Component {

    state = {
        id: '',
        firstName: '',
        lastName: '',
        phonenumber: '',


    }


    async componentDidMount() {


        try {
            let tokenUser = this.props.token;

            let id = this.props.data.id;
            let response = await getUserInfo(id, tokenUser);
            if (response && response.data) {
                this.setState({
                    id: response.data.id,
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    phonenumber: response.data.phonenumber,
                    role: response.data.roleId
                })
            }
            else {
                console.log('User not found!')
            }


        } catch (error) {
            console.log(error)
        }
    }

    componentDidUpdate() {

    }

    handleOnchangeInput = (event, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = event.target.value;
        this.setState({
            ...coppyState
        })

    }

    checkInput = () => {
        let check = true;
        let arrInput = ['firstName', 'lastName', 'phonenumber'];
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

    handleEditUser = async (user) => {
        let tokenUser = this.props.token;
        let isValid = this.checkInput();

        if (isValid === true) {
            try {
                let userData = await handlePutUpdateUser(user, tokenUser);
                if (userData && userData.data.errCode === 0) {
                    this.props.updateUserSuccess(userData.data.userEdit);
                    toast.success("Update Successful!")
                    this.props.history.push("/");
                }
                else {
                    console.log(userData.data.errMessage)
                }
            } catch (error) {
                console.log(error)
            }

        }


    }

    render() {
        let user = this.state;
        return (

            <React.Fragment>
                <HomHeader />
                <div className="get-user-wrap ">
                    <div className="get-user-header">

                        <div className="get-user-title">Accout update</div>

                        <div className="get-user-text">
                            Need to update your information with us? Please fill out this form and we will update our records.
                        </div>

                    </div>

                    <div className="get-user-info">

                        <label className="inputInfo">First Name</label>
                        <input type="text" className="user-input" placeholder="enter your firstName" value={this.state.firstName} onChange={(event) => this.handleOnchangeInput(event, 'firstName')} />

                    </div>
                    <div className="get-user-info">

                        <label className="inputInfo">Last Name</label>
                        <input type="text" className="user-input" placeholder="enter your lastName" value={this.state.lastName} onChange={(event) => this.handleOnchangeInput(event, 'lastName')} />

                    </div>
                    <div className="get-user-info">

                        <label className="inputInfo">Phone number</label>
                        <input type="text" className="user-input" placeholder="enter your phonenumber" value={this.state.phonenumber} onChange={(event) => this.handleOnchangeInput(event, 'phonenumber')} />

                    </div>
                    <div className="btn-get-user-save">
                        <button type="submit" className="btn btn-primary" onClick={() => this.handleEditUser(user)}>Save</button>
                    </div>


                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.user.userInfo,
        token: state.user.token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserSuccess: (userInfo, token) => dispatch(action.updateUserSuccess(userInfo, token))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));