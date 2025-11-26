import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import AdminHeader from "./AdminHeader";
import * as action from "../../store/actions/adminAction";

class ManageDocuments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingDocumentList: []
        }
    }

    componentDidMount() {
        this.props.getPendingDocument(this.props.token);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.pendingDocument !== this.props.pendingDocument) {
            let data = this.props.pendingDocument;
            this.setState({
                pendingDocumentList: data
            })
        }
    }

    handleRejectDocument = (documentId) => {
        let token = this.props.token;
        this.props.rejectDocument(documentId, token);
    }

    handleApproveDocument = (documentId) => {
        let token = this.props.token;
        this.props.approveDocument(documentId, token);
    }
    render() {
        console.log('check state: ', this.state.pendingDocumentList);
        let { pendingDocumentList } = this.state;
        return (
            <React.Fragment>
                <AdminHeader />
                <div className="manage-user-title">Manage Documents</div>
                <div className="container">

                    <br></br>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>File Name</th>
                                <th>Faculty</th>
                                <th>Major</th>
                                <th>User</th>
                                <th>Status</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {pendingDocumentList && pendingDocumentList.length > 0 && pendingDocumentList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.fileName}</td>
                                        <td>{item.facultyId}</td>
                                        <td>{item.majorId}</td>
                                        <td>{item.User.firstName} {item.User.lastName}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button><i className="fa-solid fa-file-circle-check" onClick={() => this.handleApproveDocument(item.id)}></i></button>
                                            <button><i className="fa-solid fa-file-circle-xmark" onClick={() => this.handleRejectDocument(item.id)}></i></button>
                                        </td>
                                    </tr>
                                )
                            })}


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
        pendingDocument: state.admin.pendingDocument
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPendingDocument: (token) => dispatch(action.getPendingDocument(token)),
        rejectDocument: (documentId, token) => dispatch(action.rejectDocument(documentId, token)),
        approveDocument: (documentId, token) => dispatch(action.approveDocument(documentId, token))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageDocuments));