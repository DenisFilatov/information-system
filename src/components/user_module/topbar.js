import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logOut } from "../../utils/helper";
import "./user_module.scss";

class Topbar extends Component {
  render() {
    return (
      <div className="is-t-container">
        <div className="is-t-username">{`User#${5}`}</div>
        <div className="is-t-logout" onClick={() => logOut()}>
          <span>LogOut</span>
          <img src="https://icongr.am/clarity/logout.svg?size=20&color=ffffff" alt="logout" />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Topbar);
