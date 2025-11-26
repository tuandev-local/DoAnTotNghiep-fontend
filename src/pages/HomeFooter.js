import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import './HomeFooter.scss';

class HomeFooter extends React.Component {

    render() {
        return (
            <React.Fragment>
                <footer className="text-center bg-body-tertiary" style={{ backgroundColor: "black" }}>

                    <div className="container pt-4">

                        <section className="mb-4">

                            <div
                                data-mdb-ripple-init
                                className="btn btn-link btn-floating btn-lg text-body m-1"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="fab fa-facebook-f" style={{ color: "white" }}></i
                            ></div>


                            <div
                                data-mdb-ripple-init
                                className="btn btn-link btn-floating btn-lg text-body m-1"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="fab fa-twitter" style={{ color: "white" }}></i
                            ></div>


                            <div
                                data-mdb-ripple-init
                                className="btn btn-link btn-floating btn-lg text-body m-1"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="fab fa-google" style={{ color: "white" }}></i
                            ></div>


                            <div
                                data-mdb-ripple-init
                                className="btn btn-link btn-floating btn-lg text-body m-1"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="fab fa-instagram" style={{ color: "white" }}></i
                            ></div>


                            <div
                                data-mdb-ripple-init
                                className="btn btn-link btn-floating btn-lg text-body m-1"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="fab fa-linkedin" style={{ color: "white" }}></i
                            ></div>

                            <div
                                data-mdb-ripple-init
                                className="btn btn-link btn-floating btn-lg text-body m-1"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="fab fa-github" style={{ color: "white" }}></i
                            ></div>
                        </section>

                    </div>

                    <div className="text-center p-3" style={{ backgroundColor: "black" }}>
                        <div style={{ color: "white" }}>© 2025 Copyright: VMU</div>
                    </div>

                </footer>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeFooter));