import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setLoaderStatus } from "../../store/actions";
import { logOut } from "../../utils/helper";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import "./user_module.scss";

class UserModule extends Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <Topbar />
        <div className="is-um-container">UserModule</div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setLoaderStatus: bindActionCreators(setLoaderStatus, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(UserModule);
