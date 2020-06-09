import React, { Component } from "react";
import { toastr } from "react-redux-toastr";
import PropTypes from "prop-types";
import { isAdminPassword, getUsersList } from "../../utils/helper";
import Input from "../common_components/input";
import Button from "../common_components/button";
import "./user_module.scss";

export default class NewUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      level: undefined,
      admin_password: "",
      existed_users: getUsersList()
    };
  }

  renderUsernameInput() {
    const handleOnChange = username => this.setState({ username });
    return (
      <Input
        type="text"
        class_name="is-nuf-input"
        placeholder="Username"
        value={this.state.username}
        onChange={handleOnChange}
      />
    );
  }

  renderPasswordInput() {
    const handleOnChange = password => this.setState({ password });
    return (
      <Input
        type="password"
        class_name="is-nuf-input"
        placeholder="Password"
        value={this.state.password}
        onChange={handleOnChange}
      />
    );
  }

  renderLevelInput() {
    const handleOnChange = level => {
      if (level < 0) return undefined;
      this.setState({ level });
    };
    return (
      <Input
        type="number"
        class_name="is-nuf-input"
        placeholder="Level"
        value={this.state.level}
        onChange={handleOnChange}
      />
    );
  }

  renderAdminPasswordInput() {
    const handleOnChange = admin_password => this.setState({ admin_password });
    return (
      <Input
        type="password"
        class_name="is-nuf-input"
        placeholder="Admin password"
        value={this.state.admin_password}
        onChange={handleOnChange}
      />
    );
  }

  renderSaveButton() {
    const handleOnClick = () => {
      const { username, password, level, admin_password, existed_users } = this.state;
      if (!username || !password || !level || !admin_password) {
        toastr.warning("Warning", "Please enter all fields");
        return undefined;
      }
      if (existed_users.includes(username)) {
        toastr.warning("Warning", "User with the same name already exists");
        return undefined;
      }
      if (!isAdminPassword(admin_password)) {
        toastr.error("Error", "Invalid admin password");
        return undefined;
      }
      this.setState({ username: "", password: "", level: undefined, admin_password: "" }, () =>
        this.props.onSave({ username, password, level, admin_password })
      );
    };
    return <Button class_name="is-nuf-button" text="SAVE" onClick={handleOnClick} />;
  }

  render() {
    return (
      <div className="is-nuf-container">
        <div className="is-nuf-header">New User</div>
        {this.renderUsernameInput()}
        {this.renderPasswordInput()}
        {this.renderLevelInput()}
        {this.renderAdminPasswordInput()}
        {this.renderSaveButton()}
      </div>
    );
  }
}

NewUserForm.NewUserForm = {
  onSave: user => console.log(user)
};
NewUserForm.NewUserForm = {
  onSave: PropTypes.func
};
