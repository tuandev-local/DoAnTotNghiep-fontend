import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import './DocumentSection.scss';



class DocumentSection extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="section-all-contain">
                    <div className="section-all-content">
                        <div className="section-all-title">Recommended Documents</div>
                        <div className="section-all-recommend-doc">
                            <div className="section-doc">
                                <div className="doc-show"></div>
                                <div className="doc-description">Document about learning Computer</div>
                            </div>

                            <div className="section-doc">
                                <div className="doc-show"></div>
                                <div className="doc-description">Document about learning Computer</div>
                            </div>

                            <div className="section-doc">
                                <div className="doc-show"></div>
                                <div className="doc-description">Document about learning Computer</div>
                            </div>

                            <div className="section-doc">
                                <div className="doc-show"></div>
                                <div className="doc-description">Document about learning Computer</div>
                            </div>

                            <div className="section-doc">
                                <div className="doc-show"></div>
                                <div className="doc-description">Document about learning Computer</div>
                            </div>

                            <div className="section-doc">
                                <div className="doc-show"></div>
                                <div className="doc-description">Document about learning Computer</div>
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
        // userLoginSuccess: (userInfo, token) => dispatch(action.userLoginSuccess(userInfo, token)),
        // userLoginFail: () => dispatch(action.userLoginFail()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DocumentSection));