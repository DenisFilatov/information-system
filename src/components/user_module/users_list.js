import React, { Component } from "react";
import { toastr } from "react-redux-toastr";
import PropTypes from "prop-types";
import { isAdminPassword, getUsersList } from "../../utils/helper";
import Input from "../common_components/input";
import Button from "../common_components/button";
import "./user_module.scss";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: getUsersList(),
      username: "",
      admin_password: ""
    };
  }

  renderUsernameInput() {
    const handleOnChange = username => this.setState({ username });
    return (
      <Input
        type="text"
        class_name="is-ul-input"
        placeholder="Username"
        value={this.state.username}
        onChange={handleOnChange}
      />
    );
  }

  renderAdminPasswordInput() {
    const handleOnChange = admin_password => this.setState({ admin_password });
    return (
      <Input
        type="password"
        class_name="is-ul-input"
        placeholder="Admin password"
        value={this.state.admin_password}
        onChange={handleOnChange}
      />
    );
  }

  renderDeleteButton() {
    const handleOnClick = () => {
      const { users, username, admin_password } = this.state;
      if (!username || !admin_password) {
        toastr.warning("Warning", "Please enter all fields");
        return undefined;
      }
      if (!users.includes(username)) {
        toastr.warning("Warning", "User with this name does not exist");
        return undefined;
      }
      if (username === "admin") {
        toastr.warning("Warning", "Admin can not be deleted");
        return undefined;
      }
      if (!isAdminPassword(admin_password)) {
        toastr.error("Error", "Invalid admin password");
        return undefined;
      }
      this.setState({ username: "", admin_password: "", users: users.filter(u => u !== username) }, () =>
        this.props.onDelete(username)
      );
    };
    return <Button class_name="is-ul-button" text="DELETE" onClick={handleOnClick} />;
  }

  renderUsersList() {
    const users_list = this.state.users.map(user_name => <div key={user_name}>{user_name}</div>);
    return <div className="is-ul-users_list">{users_list}</div>;
  }

  renderDeleteUserForm() {
    return (
      <div className="is-ul-duf">
        {this.renderUsernameInput()}
        {this.renderAdminPasswordInput()}
        {this.renderDeleteButton()}
      </div>
    );
  }

  render() {
    return (
      <div className="is-ul-container">
        <div className="is-ul-header">Users List</div>
        {this.renderUsersList()}
        {this.renderDeleteUserForm()}
      </div>
    );
  }
}

UsersList.NewUserForm = {
  onDelete: username => console.log(username)
};
UsersList.NewUserForm = {
  onDelete: PropTypes.func
};
