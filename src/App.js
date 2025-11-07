import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import GetUserProfile from './pages/Profile/GetUserProfile';
import ProtectedRoute from './Auth/userAuthentication';
import UploadDocuments from './pages/UploadDocumentSection/UploadDocuments';


class App extends React.Component {

  render() {

    return (
      <>
        < Router >
          <Switch>


            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <ProtectedRoute exact path="/auth/update-user" component={GetUserProfile} />
            <ProtectedRoute exact path="/auth/upload-document" component={UploadDocuments} />
          </Switch>
        </Router >


      </>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    data: state.user.userInfo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
