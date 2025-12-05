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
            documents: [],
            keyword: ''
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

        if (prevProps.searchDocument !== this.props.searchDocument) {
            this.setState({
                documents: this.props.searchDocument
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

    handleOnchangeKeyword = (event) => {
        this.setState({
            keyword: event.target.value
        })
    }

    handleSearchDocument = (keyword) => {
        this.props.searchByKeywordRedux(keyword, this.props.token);

    }
    render() {
        let { documents, keyword } = this.state;
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
                                    <input type="search" className="form-control" placeholder="What are you studying today" value={keyword} onChange={(event) => this.handleOnchangeKeyword(event)} />
                                </div>
                                <button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={() => this.handleSearchDocument(keyword)}>
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
        fillterDocumentByMajor: state.document.majorDocument,
        searchDocument: state.document.searchDocument
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDetailDocument: (document, token) => dispatch(action.getDetailDocument(document, token)),
        searchByKeywordRedux: (keyword, token) => dispatch(action.searchByKeywordRedux(keyword, token))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FindDocument));