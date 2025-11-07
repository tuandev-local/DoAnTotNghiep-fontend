import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';

import HomHeader from "./HomHeader";
import DocumentSection from "./HomeSection/DocumentSection";


class Home extends React.Component {

    render() {

        return (
            <React.Fragment>
                <HomHeader />
                <DocumentSection />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));