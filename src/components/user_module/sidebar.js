import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./user_module.scss";

class Sidebar extends Component {
  render() {
    return (
      <div className="is-s-container">
        <div className="is-s-header">MENU</div>
        <div className="is-s-items">
          <div>Files</div>
          <div>My keys</div>
          <div>Create user</div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Sidebar);
