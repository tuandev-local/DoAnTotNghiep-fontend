import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import GetUserProfile from './pages/Profile/GetUserProfile';
import ProtectedRoute from './Auth/userAuthentication';
import ProtectedAdminRoute from './Auth/adminAuthorization';
import UploadDocuments from './pages/UploadDocumentSection/UploadDocuments';
import UploadDocumentForm from './pages/UploadDocumentSection/UploadDocumentForm';
import ManageUsers from './pages/AdminPage/ManageUsers';
import ManageDocuments from './pages/AdminPage/ManageDocuments';
import DetailDocument from './pages/HomeSection/DetailDocument';
import FavouritesDocument from './pages/FavouritesDocument/FavouritesDocument';
import FindDocument from './pages/FindDocumentSection/FindDocument';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./pdf-worker";
class App extends React.Component {

  render() {

    return (

      < Router >
        <div>
          <Switch>

            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <ProtectedRoute exact path="/auth/update-user" component={GetUserProfile} />
            <ProtectedRoute exact path="/auth/upload-document" component={UploadDocuments} />
            <ProtectedRoute exact path="/auth/upload-document/form" component={UploadDocumentForm} />
            <ProtectedRoute exact path="/auth/get-detail-document" component={DetailDocument} />
            <ProtectedRoute exact path="/auth/favourites-document" component={FavouritesDocument} />
            <ProtectedRoute exact path="/auth/find-document" component={FindDocument} />
            <ProtectedAdminRoute exact path="/system-administrator-users" component={ManageUsers} />
            <ProtectedAdminRoute exact path="/system-administrator-documents" component={ManageDocuments} />
          </Switch>
        </div>
        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </Router >

    );
  }

}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    data: state.user.userInfo,
    documentInfo: state.document.documentInfo,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
