import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import AdminHeader from "./AdminHeader";
import './ManageUser.scss';
import * as action from "../../store/actions/adminAction";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";

class ManageUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            listUser: [],
            userEdit: {}
        }
    }

    componentDidMount() {
        let tokenInput = this.props.token;
        this.props.getAllUserRedux(tokenInput);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrUser !== this.props.arrUser) {
            this.setState({
                listUser: this.props.arrUser
            })
        }
    }

    toggleEditUserModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        })
    }

    handleShowModalFromtParent = (user) => {
        this.setState({
            showModal: !this.state.showModal,
            userEdit: user
        })
    }

    handleRemoveUser = (user) => {
        let userToken = this.props.token;
        this.props.DeleteUserRedux(user.id, userToken);
    }

    EditUser = (user) => {
        let token = this.props.token;
        this.props.updateUserRedux(user, token);
        this.setState({
            showModal: false,
        })
    }

    render() {

        const { listUser } = this.state;
        return (
            <React.Fragment>
                <AdminHeader />
                <div className="manage-user-title">Manage Users</div>
                <div className="container">
                    <ModalAddUser />
                    <ModalEditUser
                        isOpen={this.state.showModal}
                        toggleFromParents={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.EditUser}
                    />
                    <br></br>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Phone number</th>
                                <th>Role</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {listUser && listUser.length > 0 &&
                                listUser.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.phonenumber}</td>
                                            <td>{item.roleId}</td>
                                            <td>
                                                <button onClick={() => this.handleShowModalFromtParent(item)}><i className="fa-solid fa-pen-to-square"></i></button>
                                                <button onClick={() => this.handleRemoveUser(item)}><i className="fa-solid fa-user-xmark"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        arrUser: state.admin.arrUser
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUserRedux: (token) => dispatch(action.getAllUser(token)),
        DeleteUserRedux: (userId, token) => dispatch(action.DeleteUserAction(userId, token)),
        updateUserRedux: (userData, token) => dispatch(action.updateUserAction(userData, token))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageUsers));