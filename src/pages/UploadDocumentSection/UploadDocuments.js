import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import './UploadDocuments.scss';
import HomeHeader from "../HomeHeader";
import * as action from '../../store/actions/documentAction';



class UploadDocuments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,

        }
        this.fileInput = React.createRef();
    }


    handleFileOpen = () => {
        this.fileInput.current.click();
    }

    handleReadFile = (event) => {
        this.setState({
            selectedFile: event.target.files[0],

        })

    }

    handleRemoveFile = () => {
        this.setState({
            selectedFile: null,

        })
    }

    handleOnClickUpload = (fileInput) => {
        this.props.getFile(fileInput);
        this.props.history.push("/auth/upload-document/form");
    }
    render() {
        console.log(this.state.selectedFile)
        let { selectedFile } = this.state;
        return (
            <React.Fragment>
                <HomeHeader />
                <div className="upload-container">


                    <div className="upload-top">
                        <div className="upload-contents">

                            <div className="upload-top-header">
                                <p className="upload-top-title">Share your high-quality document</p>
                            </div>

                            <div className="upload-file-form" onClick={() => this.handleFileOpen()} >
                                <div className="input-wrapper">
                                    <input type="file" ref={this.fileInput} className="input-file" accept=".doc,.docx,.odt,.pdf,.ppt,.pptx,.rtf,.xls,.xlsx" onChange={(event) => this.handleReadFile(event)} />
                                    <span className="upload-icon"><i className="fa-solid fa-upload"></i></span>
                                    <p className="drag-file">Drag your files here</p>
                                    <div className="seperator">
                                        <div className="seperate-label">Or</div>
                                    </div>
                                    <button className="btn-select-file">Select file</button>
                                </div>
                            </div>
                            {selectedFile &&
                                <div className="display-file">
                                    <div className="show-file">{this.state.selectedFile.name} <span onClick={() => this.handleRemoveFile()}><i className="fa-solid fa-xmark"></i></span></div>
                                    <button type="submit" className="btn-next" onClick={() => this.handleOnClickUpload(selectedFile)}>Next</button>
                                </div>
                            }



                        </div>
                    </div>


                    <div className="upload-bottom">
                        <div className="upload-bottom-contents">
                            <div className="upload-footer">

                                <div className="footer-list">
                                    <span><i className="fa-regular fa-file-zipper"></i></span>
                                    <div className="list-title">
                                        <p className="list-title-header">Only upload documents that you woud like to download</p>
                                        <p className="list-title-description">
                                            Before uploading, ask yourself whether the document is complete, comprehensive and covers all the relevant topics clearly. Documents with these qualities are the most downloaded by users
                                        </p>
                                    </div>
                                </div>

                                <div className="footer-list">
                                    <span><i className="fa-regular fa-circle-check"></i></span>
                                    <div className="list-title">
                                        <p className="list-title-header">Quality reaps rewards</p>
                                        <p className="list-title-description">
                                            What makes you successful is how much the community appreciates your document: the more it is downloaded, the more points or money you will earn
                                        </p>
                                    </div>
                                </div>

                                <div className="footer-list">
                                    <span><i className="fa-regular fa-copyright"></i></span>
                                    <div className="list-title">
                                        <p className="list-title-header">Be careful with copyright</p>
                                        <p className="list-title-description">
                                            Do not upload non-original documents or books, articles or handbooks that are not yours. This content will not earn you any points or money and it will be removed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFile: (file) => dispatch(action.getFile(file))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UploadDocuments));