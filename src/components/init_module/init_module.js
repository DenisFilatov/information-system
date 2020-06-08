import React, { Component } from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import path from "path";
import { AUXILIARY_FOLDER } from "../../configs/global";
import { getAppPath, deleteFolder } from "../../utils/fs_assistant";
import TextInput from "../common_components/text_input";
import Button from "../common_components/button";
import "./init_module.scss";

class InitModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
  }

  onSaveSettings() {
    const { password } = this.state;
    if (!password) {
      toastr.warning("Warning", "Please enter password");
      return undefined;
    }
    const auxiliary_folder = path.join(getAppPath(), AUXILIARY_FOLDER);
    //deleteFolder(auxiliary_folder);
    console.log(auxiliary_folder);
  }

  renderPasswordInput() {
    const handleOnChange = password => this.setState({ password });
    return (
      <TextInput
        class_name="is-im-input"
        placeholder="Password"
        text_security={true}
        value={this.state.password}
        onChange={handleOnChange}
      />
    );
  }

  renderSaveButton() {
    return <Button class_name="is-im-button" text="SAVE" onClick={() => this.onSaveSettings()} />;
  }

  render() {
    return (
      <div className="is-im-container">
        <div className="is-im-header">
          <span>Initial settings</span>
          <img src="https://icongr.am/clarity/file-settings.svg?size=40&color=ffffff" alt="file-settings" />
        </div>
        <div className="is-im-description">
          Welcome to the information system. To complete the initial settings, you need to create a password
          for the administrator account. In the future, on this account will be available all the necessary
          application settings.
        </div>
        {this.renderPasswordInput()}
        {this.renderSaveButton()}
      </div>
    );
  }
}

export default connect(
  null,
  null
)(InitModule);
