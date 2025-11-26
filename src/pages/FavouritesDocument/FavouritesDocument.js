import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import * as action from "../../store/actions/documentAction";
import HomeHeader from "../HomeHeader";
import HomeFooter from "../HomeFooter";

class FavouritesDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documentFavours: [],

        }
    }
    componentDidMount() {
        let userId = this.props.userInfo.id;
        let token = this.props.token;
        this.props.getFavourDocumentRedux(userId, token);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.favourDocuments !== this.props.favourDocuments) {
            this.setState({
                documentFavours: this.props.favourDocuments
            })
        }
    }

    render() {
        console.log('check favour doc: ', this.state.documentFavours);
        let { documentFavours } = this.state;
        return (
            <React.Fragment>
                <HomeHeader />
                <div className="section-all-contain">
                    <div className="section-all-content">
                        <div className="section-all-title">Favourites Documents</div>

                        <div className="section-all-recommend-doc">
                            <div className="section-all-recommend-doc-wrap">
                                <div className="section-doc">
                                    <div className="list-group list-group-flush">
                                        {documentFavours && documentFavours.length > 0 && documentFavours.map((item, index) => {
                                            return (
                                                <div key={index} className="list-group-item " >{item.Document.title ? item.Document.title : ''}</div>
                                            )
                                        })}
                                    </div>
                                </div>
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
        favourDocuments: state.document.favourDocuments,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFavourDocumentRedux: (userId, token) => dispatch(action.getFavourDocumentRedux(userId, token))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FavouritesDocument));