import React, { Component } from "react";
import { toastr } from "react-redux-toastr";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { remote } from "electron";
import path from "path";
import fs from "fs";
import { setLoaderStatus, setCryptoKeys, setUsername } from "../../store/actions";
import { AUXILIARY_FOLDER, USERS_FILE, USERS_FOLDER } from "../../configs/global";
import { generateKey, decrypt, hash } from "../../utils/crypto";
import TextInput from "../common_components/text_input";
import Button from "../common_components/button";
import "./auth_module.scss";

class AuthModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      all_users: undefined
    };
  }

  componentDidMount() {
    this.props.setLoaderStatus(true);
    const users_file_path = path.join(path.dirname(remote.app.getAppPath()), AUXILIARY_FOLDER, USERS_FILE);
    fs.readFile(users_file_path, { encoding: "utf-8" }, (err, data) => {
      if (err) console.log(err);
      else {
        this.setState({ all_users: JSON.parse(data) });
        setTimeout(() => this.props.setLoaderStatus(false), 1000);
      }
    });
  }

  renderUsernameInput() {
    const handleOnChange = username => this.setState({ username });
    return (
      <TextInput
        class_name="is-am-input"
        placeholder="Username"
        value={this.state.username}
        onChange={handleOnChange}
      />
    );
  }

  renderPasswordInput() {
    const handleOnChange = password => this.setState({ password });
    return (
      <TextInput
        class_name="is-am-input"
        placeholder="Password"
        text_security={true}
        value={this.state.password}
        onChange={handleOnChange}
      />
    );
  }

  renderLoginButton() {
    const handleOnClick = () => {
      const { all_users, username, password } = this.state;
      if (!username && !password) {
        toastr.warning("Warning", "Please enter username and password");
        return undefined;
      }
      if (!username) {
        toastr.warning("Warning", "Please enter username");
        return undefined;
      }
      if (!password) {
        toastr.warning("Warning", "Please enter password");
        return undefined;
      }
      if (!all_users[username] || all_users[username] !== hash(password)) {
        toastr.warning("Warning", "Username or password is incorrect");
        return undefined;
      }
      this.props.setLoaderStatus(true);
      this.props.setUsername(username);
      const keys_file_path = path.join(
        path.dirname(remote.app.getAppPath()),
        AUXILIARY_FOLDER,
        USERS_FOLDER,
        username
      );
      if (fs.existsSync(keys_file_path)) {
        fs.readFile(keys_file_path, { encoding: "utf-8" }, (err, data) => {
          if (err) console.log(err);
          else {
            const key = generateKey(password, username);
            const decrypted_data = decrypt(data, key);
            this.props.setCryptoKeys(JSON.parse(decrypted_data));
          }
        });
      }
    };
    return <Button class_name="is-am-button" text="LOGIN" onClick={handleOnClick} />;
  }

  render() {
    return (
      <div className="is-am-container">
        <div className="is-am-header">Authorization</div>
        {this.renderUsernameInput()}
        {this.renderPasswordInput()}
        {this.renderLoginButton()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setLoaderStatus: bindActionCreators(setLoaderStatus, dispatch),
  setUsername: bindActionCreators(setUsername, dispatch),
  setCryptoKeys: bindActionCreators(setCryptoKeys, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(AuthModule);
