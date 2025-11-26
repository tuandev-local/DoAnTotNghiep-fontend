import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import './UploadDocumentForm.scss';
import HomeHeader from "../HomeHeader";
import { handleUploadTheDocument } from "../../services/documentServices";
import { toast } from 'react-toastify';
import HomeFooter from "../HomeFooter";
import * as action from "../../store/actions/documentAction";

class UploadDocumentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            facultyArr: [],
            majorArr: [],
            userId: '',
            title: '',
            description: '',
            facultyId: '',
            majorId: ''
        }

    }
    componentDidMount() {
        let fileRedux = this.props.fileProps;
        let userRedux = this.props.userInfo;
        this.props.getFacultyRedux();
        this.props.getMajorRedux();

        this.setState({
            selectedFile: fileRedux,
            userId: userRedux ? userRedux.id : null,
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.facultyRedux !== this.props.facultyRedux) {
            let arrFaculty = this.props.facultyRedux
            this.setState({
                facultyArr: arrFaculty,
                facultyId: arrFaculty[0].name,
            })
        }

        if (prevProps.majorRedux !== this.props.majorRedux) {
            let arrMajor = this.props.majorRedux;
            this.setState({
                majorArr: arrMajor,
                majorId: arrMajor[0].name,
            })
        }
    }

    checkInput = () => {
        let check = true;
        let arrInput = ['title', 'description'];
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
            ...coppyState
        })
    }

    handleUploadDocument = async () => {
        let isValid = this.checkInput();
        let tokenRedux = this.props.token;
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('facultyId', this.state.facultyId);
        formData.append('majorId', this.state.majorId);
        formData.append('userId', this.state.userId);

        if (isValid === true) {
            try {
                let res = await handleUploadTheDocument(formData, tokenRedux);
                console.log(res);
                if (res && res.data.errCode === 0) {
                    toast.success("Upload Document Successful!");
                    this.props.history.push("/");
                }
                else {
                    toast.error(res.data.errMessage);
                }
            } catch (error) {
                console.log(error)
            }

        }

    }

    render() {
        console.log('check state: ', this.state);
        let { selectedFile, title, description, facultyId, majorId, facultyArr, majorArr } = this.state;
        return (
            <React.Fragment>
                <HomeHeader />
                <div className="upload-form-box">
                    <div className="upload-form-contained">
                        <div className="form-wrap">
                            <div className="form-head">
                                Add information
                            </div>
                            <div className="form-info">
                                <div className="file-contain">
                                    <i className="fa-solid fa-file"></i>{selectedFile ? this.state.selectedFile.name : 'No file'}
                                </div>
                                <div className="upload-title">
                                    <label>Document's title</label>
                                    <input type="text" placeholder="Enter title" className="title-input" value={title} onChange={(event) => this.handleOnchangeInput(event, 'title')} />
                                </div>
                                <div className="upload-description">
                                    <label>Description</label>
                                    <input type="text" placeholder="Enter description" className="description-input" value={description} onChange={(event) => this.handleOnchangeInput(event, 'description')} />
                                </div>
                                <div className="faculty-select">
                                    <label>Chọn Khoa:</label>
                                    <select value={facultyId} onChange={(event) => this.handleOnchangeInput(event, 'facultyId')}>
                                        {facultyArr && facultyArr.length > 0 &&
                                            facultyArr.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.name}>{item.description}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                                <div className="major-select">
                                    <label>Chọn chuyên ngành:</label>
                                    <select value={majorId} onChange={(event) => this.handleOnchangeInput(event, 'majorId')}>
                                        {majorArr && majorArr.length > 0 &&
                                            majorArr.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.name} >{item.description}</option>
                                                )

                                            })
                                        }

                                    </select>
                                </div>
                                <button type="submit" className="btn-upload" onClick={() => this.handleUploadDocument()}>Upload</button>
                            </div>
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
        userInfo: state.user.userInfo,
        fileProps: state.document.file,
        facultyRedux: state.document.faculty,
        majorRedux: state.document.major
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFacultyRedux: () => dispatch(action.getFacultyRedux()),
        getMajorRedux: () => dispatch(action.getMajorRedux())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UploadDocumentForm));