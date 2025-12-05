import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import AdminHeader from "./AdminHeader";
import * as action from "../../store/actions/adminAction";
import "./ManageDocument.scss";

class ManageDocuments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: false,
            manageDocumentList: []
        }
    }

    componentDidMount() {
        this.props.getPendingDocument('S1', this.props.token);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.manageDocuments !== this.props.manageDocuments) {
            let data = this.props.manageDocuments;
            this.setState({
                manageDocumentList: data
            })
        }
    }

    handleShowFilter = () => {
        this.setState({
            showFilter: !this.state.showFilter
        })
    }

    handleRejectDocument = (document) => {
        let token = this.props.token;
        this.props.rejectDocument(document.id, token, document.status);
    }

    handleApproveDocument = (document) => {
        let token = this.props.token;
        this.props.approveDocument(document.id, token, document.status);
    }

    handleGetApprovedDocument = () => {
        this.props.getPendingDocument('S2', this.props.token);
    }

    handleGetRejectedDocument = () => {
        this.props.getPendingDocument('S3', this.props.token);
    }

    render() {
        let { showFilter, manageDocumentList } = this.state;
        return (
            <React.Fragment>
                <AdminHeader />
                <div className="manage-user-title">Manage Documents</div>
                <div className="container">
                    <div className="filter-btn" onClick={() => this.handleShowFilter()}>
                        <i className="fa-solid fa-filter"></i>
                        Filter
                    </div>
                    {showFilter &&
                        <div className="filter-document">
                            <button onClick={() => this.handleGetApprovedDocument()}>Approved Documents</button>
                            <button onClick={() => this.handleGetRejectedDocument()}>Rejected Documents</button>
                        </div>
                    }

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
                            {manageDocumentList && manageDocumentList.length > 0 && manageDocumentList.map((item, index) => {
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
                                            {item.status !== 'S2' &&
                                                <button><i className="fa-solid fa-file-circle-check" onClick={() => this.handleApproveDocument(item)}></i></button>
                                            }
                                            {item.status !== 'S3' &&
                                                <button><i className="fa-solid fa-file-circle-xmark" onClick={() => this.handleRejectDocument(item)}></i></button>
                                            }

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
        manageDocuments: state.admin.manageDocuments
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPendingDocument: (status, token) => dispatch(action.getPendingDocument(status, token)),
        rejectDocument: (documentId, token, documentStatus) => dispatch(action.rejectDocument(documentId, token, documentStatus)),
        approveDocument: (documentId, token, documentStatus) => dispatch(action.approveDocument(documentId, token, documentStatus))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageDocuments));