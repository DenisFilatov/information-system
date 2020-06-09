import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";
import * as _path from "path";
import { AUXILIARY_FOLDER, USERS_FOLDER } from "../../configs/global";
import { setActiveComponent, setLoaderStatus } from "../../store/actions";
import { getAppPath, createFolder, writeFile } from "../../utils/fs_assistant";
import { generateKey, encrypt } from "../../utils/crypto";
import { deleteAllPasswords } from "../../utils/pwd_manager";
import Input from "../common_components/input";
import Button from "../common_components/button";
import "./init_module.scss";

class InitModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
  }

  renderPasswordInput() {
    const handleOnChange = password => this.setState({ password });
    return (
      <Input
        type="password"
        class_name="is-im-input"
        placeholder="Password"
        value={this.state.password}
        onChange={handleOnChange}
      />
    );
  }

  renderSaveButton() {
    const handleOnClick = () => {
      const { password } = this.state;
      if (!password) {
        toastr.warning("Warning", "Please enter password");
        return undefined;
      }
      this.props.setLoaderStatus(true);
      const auxiliary_folder_path = _path.join(getAppPath(), AUXILIARY_FOLDER);
      const users_folder_path = _path.join(auxiliary_folder_path, USERS_FOLDER);
      const admin_file_path = _path.join(users_folder_path, "admin");
      const admin_file_data = JSON.stringify({ username: "admin", keys: [], is_admin: true });
      const key = generateKey(password, "admin");
      const encrypted_admin_file_data = encrypt(admin_file_data, key);
      createFolder(auxiliary_folder_path);
      createFolder(users_folder_path);
      writeFile(admin_file_path, encrypted_admin_file_data);
      deleteAllPasswords();
      setTimeout(() => {
        this.props.setActiveComponent("auth_module");
        this.props.setLoaderStatus(false);
        toastr.success("Notification", "Initial settings has been succeeded");
      }, 1000);
    };
    return <Button class_name="is-im-button" text="SAVE" onClick={handleOnClick} />;
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

const mapDispatchToProps = dispatch => ({
  setActiveComponent: bindActionCreators(setActiveComponent, dispatch),
  setLoaderStatus: bindActionCreators(setLoaderStatus, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(InitModule);
