import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import './FindDocument.scss';
import * as action from "../../store/actions/documentAction";
import HomeHeader from "../HomeHeader";
import HomeFooter from "../HomeFooter";
import ModalFindDocument from "./ModalFindDocument";

class FindDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            documents: []

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.fillterDocumentByFaculty !== this.props.fillterDocumentByFaculty) {
            this.setState({
                documents: this.props.fillterDocumentByFaculty
            })
        }

        if (prevProps.fillterDocumentByMajor !== this.props.fillterDocumentByMajor) {
            this.setState({
                documents: this.props.fillterDocumentByMajor
            })
        }
    }

    handleShowModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleFindDocument = () => {
        this.setState({
            showModal: true
        })
    }
    handleShowDetailDocument = (document) => {
        this.props.getDetailDocument(document.id, this.props.token);
        this.props.history.push(`/auth/get-detail-document`);
    }
    render() {
        console.log('check state: ', this.state.documents);
        let { documents } = this.state;
        return (
            <React.Fragment>
                <HomeHeader />
                <ModalFindDocument
                    isOpen={this.state.showModal}
                    toggleFromParents={this.handleShowModal}
                />
                <div className="find-document-container">
                    <div className="find-document-content">

                        <div className="search-bar">
                            <div className="input-group">
                                <div className="filter" onClick={() => this.handleFindDocument()}>
                                    <span >
                                        <i className="fa-solid fa-filter"></i>
                                    </span>
                                </div>
                                <div className="form-outline" data-mdb-input-init>
                                    <input type="search" className="form-control" placeholder="What are you studying today" />
                                </div>
                                <button type="button" className="btn btn-primary" data-mdb-ripple-init>
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>

                        <div className="show-result-search-content">
                            <ul className="list-group list-group-flush">
                                {documents && documents.length > 0 && documents.map((item, index) => {
                                    return (
                                        <li className="list-group-item" key={index} onClick={() => this.handleShowDetailDocument(item)}>{item.title}</li>
                                    )
                                })}
                            </ul>
                        </div>

                    </div>
                </div>
                <HomeFooter />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        fillterDocumentByFaculty: state.document.facultyDocument,
        fillterDocumentByMajor: state.document.majorDocument
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

        getDetailDocument: (document, token) => dispatch(action.getDetailDocument(document, token))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FindDocument));