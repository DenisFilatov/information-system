import React, { Component } from "react";
import { toastr } from "react-redux-toastr";
import PropTypes from "prop-types";
import { isAdminPassword } from "../../utils/user_manager";
import Input from "../common_components/input";
import Button from "../common_components/button";
import "./user_module.scss";

export default class LevelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: props.min_level,
      admin_password: ""
    };
  }

  renderLevelInput() {
    const handleOnChange = level => {
      if (level < this.props.min_level) return undefined;
      this.setState({ level });
    };
    return (
      <Input
        type="number"
        class_name="is-lf-input"
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
        class_name="is-lf-input"
        placeholder="Admin password"
        value={this.state.admin_password}
        onChange={handleOnChange}
      />
    );
  }

  renderSaveButton() {
    const handleOnClick = () => {
      const { level, admin_password } = this.state;
      if (!level || !admin_password) {
        toastr.warning("Warning", "Please enter all fields");
        return undefined;
      }
      if (!isAdminPassword(admin_password)) {
        toastr.error("Error", "Invalid admin password");
        return undefined;
      }
      this.setState({ level: undefined, admin_password: "" }, () =>
        this.props.onSave({ level, admin_password })
      );
    };
    return <Button class_name="is-lf-button" text="SAVE" onClick={handleOnClick} />;
  }

  render() {
    return (
      <div className="is-lf-container">
        <div className="is-lf-header">Increase own level</div>
        {this.renderLevelInput()}
        {this.renderAdminPasswordInput()}
        {this.renderSaveButton()}
      </div>
    );
  }
}

LevelForm.defaultProps = {
  min_level: 0,
  onSave: data => console.log(data)
};
LevelForm.propTypes = {
  min_level: PropTypes.number,
  onSave: PropTypes.func
};
