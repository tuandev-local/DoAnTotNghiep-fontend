import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import * as action from "../../store/actions/documentAction";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



class ModalAddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            facultyArr: [],
            majorArr: [],
            faculty: '',
            major: ''
        }
    }

    componentDidMount() {
        this.props.getFacultyRedux();
        this.props.getMajorRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.facultyRedux !== this.props.facultyRedux) {
            this.setState({
                facultyArr: this.props.facultyRedux
            })
        }

        if (prevProps.majorRedux !== this.props.majorRedux) {
            this.setState({
                majorArr: this.props.majorRedux
            })
        }
    }

    handleShowModal = () => {
        this.props.toggleFromParents();
    }

    handleSearchDocumentByFaculty = (facultyInput) => {
        let tokenInput = this.props.token;
        this.props.fillterFacultyRedux(facultyInput, tokenInput);
        this.setState({
            faculty: '',
        })
    }

    handleSearchDocumentByMajor = (majorInput) => {
        let tokenInput = this.props.token;
        this.props.fillterMajorRedux(majorInput, tokenInput);
        this.setState({
            major: '',
        })
    }


    render() {
        let { facultyArr, majorArr, faculty, major } = this.state;
        return (
            <React.Fragment>
                <div>

                    <Modal isOpen={this.props.isOpen} toggle={this.handleShowModal}>
                        <ModalHeader toggle={this.handleShowModal}>Search in</ModalHeader>
                        <ModalBody>
                            <div className="find-by-faculty">
                                <label className="faculty-title">Khoa:</label>

                                {facultyArr && facultyArr.length > 0 && facultyArr.map((item, index) => {
                                    return (
                                        <div className="form-check" key={index}>
                                            <input className="form-check-input" type="checkbox" name="option" value={faculty} onClick={() => this.handleSearchDocumentByFaculty(item.name)} />
                                            <label className="form-check-label">{item.description}</label>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="find-by-major">
                                <label className="major-title">Chuyên ngành:</label>
                                {majorArr && majorArr.length > 0 && majorArr.map((item, index) => {
                                    return (
                                        <div className="form-check" key={index}>
                                            <input type="radio" className="form-check-input" name="optradio" value={major} onClick={() => this.handleSearchDocumentByMajor(item.name)} />
                                            {item.description}
                                            <label className="form-check-label"></label>
                                        </div>
                                    )
                                })}

                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.handleShowModal}>
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
        facultyRedux: state.document.faculty,
        majorRedux: state.document.major
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFacultyRedux: () => dispatch(action.getFacultyRedux()),
        getMajorRedux: () => dispatch(action.getMajorRedux()),
        fillterFacultyRedux: (facultyInput, tokenInput) => dispatch(action.fillterFacultyRedux(facultyInput, tokenInput)),
        fillterMajorRedux: (majorInput, tokenInput) => dispatch(action.fillterMajorRedux(majorInput, tokenInput))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalAddUser));