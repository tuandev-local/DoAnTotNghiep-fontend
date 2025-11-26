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
            documentDetail: [],
            title: '',
            description: '',
            faculty: '',
            major: '',
            userFirstName: '',
            userLastName: '',
            fileUrl: '',
            numPages: null,
            pageNumber: 1
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.documentInfo !== this.props.documentInfo) {
            let detailDocument = this.props.documentInfo.data;
            this.setState({
                documentDetail: detailDocument,
                title: detailDocument.title,
                description: detailDocument.description,
                faculty: detailDocument.facultyId,
                major: detailDocument.majorId,
                userFirstName: detailDocument.User.firstName,
                userLastName: detailDocument.User.lastName,
                fileUrl: this.props.documentInfo.fileUrl
            })
        }
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    handleOnclickDownloadDocument = async (document) => {
        let documentId = document.id;
        await getDownloadDocumentById(documentId);
        window.open(`http://localhost:5000/api/download-document-by-id?id=${documentId}}`, "_blank");
    }

    handleOnclickFavourDocument = (document) => {
        console.log('check document favour: ', document);
        let token = this.props.token;
        let userId = this.props.userInfo.id;
        let documentId = document.id;
        let data = { userId, documentId };
        this.props.addFavourDocumentRedux(data, token);
    }
    render() {
        console.log('check state: ', this.state);
        let { documentDetail, title, description, faculty, major, userFirstName, userLastName, fileUrl, numPages, pageNumber } = this.state;
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
                                            </div>

                                            <div className="show-description-document">
                                                {description ? description : 'no description'}
                                            </div>
                                        </div>

                                        <div className="title-right">
                                            <div className="show-user-buton-document">
                                                <div className="show-button">
                                                    <button className="btn-download" onClick={() => this.handleOnclickDownloadDocument(documentDetail)}>DownLoad</button>
                                                    <button className="btn-favour" onClick={() => this.handleOnclickFavourDocument(documentDetail)}><i className="fa-regular fa-bookmark"></i></button>
                                                    <button className="btn-report"><i className="fa-solid fa-flag"></i></button>
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
                                        document show here
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

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFavourDocumentRedux: (data, token) => dispatch(action.addFavourDocumentRedux(data, token))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailDocument));