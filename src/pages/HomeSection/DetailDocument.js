import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import './DetailDocument.scss';
import * as action from "../../store/actions/documentAction";
import HomeHeader from "../HomeHeader";
import HomeFooter from "../HomeFooter";
import { Document, Page } from 'react-pdf';
import { getDownloadDocumentById } from '../../services/documentServices';

class DetailDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            description: '',
            faculty: '',
            major: '',
            userFirstName: '',
            userLastName: '',
            fileUrl: '',
            numPages: null,
            pageNumber: 1,
            tagName: [],
            suggestDocuments: []
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.documentInfo !== this.props.documentInfo) {
            let detailDocument = this.props.documentInfo.data;
            this.setState({
                id: detailDocument.id,
                title: detailDocument.title,
                description: detailDocument.description,
                faculty: detailDocument.facultyId,
                major: detailDocument.majorId,
                userFirstName: detailDocument.User.firstName,
                userLastName: detailDocument.User.lastName,
                fileUrl: this.props.documentInfo.fileUrl,
                tagName: detailDocument.Tags
            })
        }

        if (prevProps.suggestDocumentRedux !== this.props.suggestDocumentRedux) {
            this.setState({
                suggestDocuments: this.props.suggestDocumentRedux
            })
        }
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    handleOnclickDownloadDocument = async (documentId) => {
        await getDownloadDocumentById(documentId);
        window.open(`http://localhost:5000/api/download-document-by-id?id=${documentId}}`, "_blank");
    }

    handleOnclickFavourDocument = (documentId) => {
        let token = this.props.token;
        let userId = this.props.userInfo.id;
        let data = { userId, documentId };
        this.props.addFavourDocumentRedux(data, token);
    }

    handleShowDetailDocument = (document) => {

        this.props.getDetailDocument(document.id, this.props.token);
        this.props.getSuggestDocument(document.id, this.props.token);

    }

    render() {

        let { id, title, description, faculty, major, userFirstName, userLastName, fileUrl, numPages, pageNumber, tagName, suggestDocuments } = this.state;
        return (
            <div className="detail-document-container">
                <HomeHeader />
                <div className="detail-document-content">

                    <div className="detail-document-section">

                        <div className="show-info-document-header">

                            <div className="show-info-document-content">

                                <div className="show-info-document-display">

                                    <div className="show-title-document">
                                        <div className="title-left">
                                            <div className="document-rating"><button className="btn-rating">⭐⭐⭐⭐</button></div>
                                            <div className="document-title">
                                                <h1>{title ? title : 'no title'}</h1>
                                            </div>

                                            <div className="show-falculty-major">
                                                <div className="display-falculty">{faculty ? faculty : 'no faculty'}</div>
                                                <div className="display-major">{major ? major : 'no major'}</div>
                                                {tagName && tagName.length > 0 && tagName.map((item, index) => {
                                                    return (
                                                        <div key={index} style={{ color: 'blue' }}>{item.name}</div>
                                                    )
                                                })}

                                            </div>

                                            <div className="show-description-document">
                                                {description ? description : 'no description'}
                                            </div>
                                        </div>

                                        <div className="title-right">
                                            <div className="show-user-buton-document">
                                                <div className="show-button">
                                                    <button className="btn-download" onClick={() => this.handleOnclickDownloadDocument(id)}>DownLoad</button>
                                                    <button className="btn-favour" onClick={() => this.handleOnclickFavourDocument(id)}><i className="fa-regular fa-bookmark"></i></button>
                                                    {/* <button className="btn-report"><i className="fa-solid fa-flag"></i></button> */}
                                                </div>

                                                <div className="show-user">Author: {userFirstName ? userFirstName : 'no'}-{userLastName ? userLastName : 'user'}</div>
                                            </div>
                                        </div>
                                    </div>



                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="display-document-file">
                        <div className="display-content">

                            <div className="content-left">
                                <div className="view-page">
                                    <div className="toolbar">
                                        <span>{pageNumber}/{numPages}</span>
                                    </div>

                                    <Document className="display-file-view" file={fileUrl} onLoadSuccess={this.onDocumentLoadSuccess}>
                                        <Page pageNumber={pageNumber} />
                                    </Document>
                                </div>
                            </div>

                            <div className="content-right">
                                <div className="content-wrap">
                                    <div className="related-title">Related Document</div>
                                    <div className="show-related">
                                        {suggestDocuments && suggestDocuments.length > 0 && suggestDocuments.map((item, index) => {
                                            return (
                                                <div className="related-document-section" key={index} onClick={() => this.handleShowDetailDocument(item.Document)}>
                                                    <i className="fa-solid fa-file-lines"></i> {item.Document.title}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <HomeFooter />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        userInfo: state.user.userInfo,
        documentInfo: state.document.documentInfo,
        suggestDocumentRedux: state.document.suggestDocument
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFavourDocumentRedux: (data, token) => dispatch(action.addFavourDocumentRedux(data, token)),
        getDetailDocument: (document, token) => dispatch(action.getDetailDocument(document, token)),
        getSuggestDocument: (documentId, token) => dispatch(action.getSuggestDocument(documentId, token))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailDocument));