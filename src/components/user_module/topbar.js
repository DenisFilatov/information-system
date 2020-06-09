import React, { Component } from "react";
import PropTypes from "prop-types";
import "./user_module.scss";

export default class Topbar extends Component {
  renderUsername() {
    const { username, user_level } = this.props;
    const header_text = `${username}#${user_level}`;
    return <div className="is-t-username">{header_text}</div>;
  }

  renderLogOutButton() {
    const { onLogOut } = this.props;
    return (
      <div className="is-t-logout" onClick={onLogOut}>
        <span>LogOut</span>
        <img src="https://icongr.am/clarity/logout.svg?size=20&color=ffffff" alt="logout" />
      </div>
    );
  }

  render() {
    return (
      <div className="is-t-container">
        {this.renderUsername()}
        {this.renderLogOutButton()}
      </div>
    );
  }
}

Topbar.defaultProps = {
  username: "",
  user_level: "",
  onLogOut: () => console.log("LogOut")
};
Topbar.propTypes = {
  username: PropTypes.string,
  user_level: PropTypes.string,
  onLogOut: PropTypes.func
};
