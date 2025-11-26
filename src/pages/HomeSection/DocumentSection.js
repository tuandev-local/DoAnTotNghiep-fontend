import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import './DocumentSection.scss';
import * as action from "../../store/actions/documentAction";


class DocumentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            page: 1,

        }
    }

    componentDidMount() {

        this.props.getDocumentsPagination(this.state.page, this.props.token);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.documentRedux !== this.props.documentRedux) {
            this.setState({
                documents: this.props.documentRedux,
            })
        }

    }

    handlePrevPage = (page) => {

        this.props.getDocumentsPagination(page, this.props.token);
        this.setState({
            page: page
        })
    }

    handleNextPage = (page) => {

        this.props.getDocumentsPagination(page, this.props.token);
        this.setState({
            page: page
        })
    }

    handleShowDetailDocument = (document) => {
        this.props.getDetailDocument(document.id, this.props.token);
        this.props.history.push(`/auth/get-detail-document`);
    }
    render() {

        let { documents, page } = this.state;
        let currentPage = this.props.currentPageRedux;
        let totalPage = this.props.totalPageRedux;
        const pageNumbers = [];
        for (let i = 1; i <= totalPage; i++) {
            pageNumbers.push(i);
        }
        // console.log('check page: ', pageNumbers);
        return (
            <React.Fragment>
                <div className="section-all-contain">
                    <div className="section-all-content">
                        <div className="section-all-title">Latest Documents</div>

                        <div className="section-all-recommend-doc">
                            <div className="section-all-recommend-doc-wrap">
                                <div className="section-doc">
                                    <div className="list-group list-group-flush">
                                        {documents && documents.length > 0 && documents.map((item, index) => {
                                            return (
                                                <div key={index} className="list-group-item " onClick={() => this.handleShowDetailDocument(item)}>{item.title}</div>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="section-doc-pagination">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <button className="page-link" aria-label="Previous" disabled={currentPage === 1} onClick={() => this.handlePrevPage(page - 1)}>
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </button>
                                    </li>

                                    {pageNumbers && pageNumbers.length > 0 && pageNumbers.map((number) => {
                                        return (
                                            <li key={number} className={number === currentPage ? 'page-item-active' : 'page-item'} ><button className="page-link" >{number}</button></li>
                                        )
                                    })}

                                    <li className="page-item">
                                        <button className="page-link" aria-label="Next" disabled={currentPage === totalPage} onClick={() => this.handleNextPage(page + 1)}>
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        documentRedux: state.document.documents,
        totalPageRedux: state.document.totalPage,
        currentPageRedux: state.document.currentPage,
        documentInfo: state.document.documentInfo,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDocumentsPagination: (page, limit, token) => dispatch(action.getDocuments(page, limit, token)),
        getDetailDocument: (document, token) => dispatch(action.getDetailDocument(document, token))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DocumentSection));