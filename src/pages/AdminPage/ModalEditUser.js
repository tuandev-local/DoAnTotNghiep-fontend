import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import * as action from "../../store/actions/adminAction";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



class ModalEditUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            id: '',
            email: '',
            password: '123456',
            firstName: '',
            lastName: '',
            phonenumber: '',
            role: '',
            arrRole: []
        }
    }
    handleShowModal = () => {
        this.props.toggleFromParents();
    }

    componentDidMount() {
        this.props.fethRoleRedux();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrRoleRedux !== this.props.arrRoleRedux) {
            let dataRole = this.props.arrRoleRedux;
            this.setState({
                arrRole: dataRole,
                role: dataRole && dataRole.length > 0 ? dataRole[1].key : ''
            })
        }
        if (prevProps.currentUser !== this.props.currentUser) {
            let user = this.props.currentUser;
            this.setState({
                id: user.id,
                email: user.email,
                password: '123456',
                firstName: user.firstName,
                lastName: user.lastName,
                phonenumber: user.phonenumber,
                role: user.roleId,
            })
        }
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

    handleOnchangeInput = (event, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = event.target.value;
        this.setState({
            ...coppyState,

        })

    }

    handleUpdateUserFromAdmin = () => {

        let isValid = this.checkInput();
        if (isValid === true) {
            let userData = {
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phonenumber: this.state.phonenumber,
                role: this.state.role,
            };
            this.props.editUser(userData);
        }
    }

    render() {

        return (
            <React.Fragment>
                <div>
                    <Modal isOpen={this.props.isOpen} toggle={() => this.handleShowModal()} >
                        <ModalHeader toggle={() => this.handleShowModal()}>Update User Info</ModalHeader>
                        <ModalBody>
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={(event) => this.handleOnchangeInput(event, 'email')} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label >Password</label>
                                        <input type="password" className="form-control" placeholder="Password" defaultValue={this.state.password} disabled />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label >First Name</label>
                                    <input type="text" className="form-control" placeholder="First Name" value={this.state.firstName} onChange={(event) => this.handleOnchangeInput(event, 'firstName')} />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" placeholder="Last Name" value={this.state.lastName} onChange={(event) => this.handleOnchangeInput(event, 'lastName')} />
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Phone Number</label>
                                        <input type="text" className="form-control" placeholder="Phone number" value={this.state.phonenumber} onChange={(event) => this.handleOnchangeInput(event, 'phonenumber')} />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Role</label>
                                        <select className="form-control" value={this.state.role} onChange={(event) => this.handleOnchangeInput(event, 'role')}>
                                            {this.state.arrRole && this.state.arrRole.length > 0 &&
                                                this.state.arrRole.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.key}>{item.valueEn}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.handleUpdateUserFromAdmin()}>
                                Save
                            </Button>{' '}
                            <Button color="secondary" onClick={() => this.handleShowModal()}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        arrRoleRedux: state.admin.arrRole
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fethRoleRedux: () => dispatch(action.fetchRoleUser()),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalEditUser));