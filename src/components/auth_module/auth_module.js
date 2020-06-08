import React, { Component } from "react";
import { toastr } from "react-redux-toastr";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setLoaderStatus, setActiveComponent } from "../../store/actions";
import { logIn } from "../../utils/helper";
import TextInput from "../common_components/text_input";
import Button from "../common_components/button";
import "./auth_module.scss";

class AuthModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onClickLogin() {
    const { username, password } = this.state;
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
    this.props.setLoaderStatus(true);
    if (logIn(username, password)) {
      setTimeout(() => {
        this.props.setActiveComponent("user_module");
        this.props.setLoaderStatus(false);
        toastr.success("Notification", `Hi, ${username}! Welcome to information system.`);
      }, 500);
    } else {
      setTimeout(() => {
        this.props.setLoaderStatus(false);
        toastr.warning("Warning", "Username or password is incorrect");
      }, 500);
    }
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
    return <Button class_name="is-am-button" text="LOGIN" onClick={() => this.onClickLogin()} />;
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
  setActiveComponent: bindActionCreators(setActiveComponent, dispatch),
  setLoaderStatus: bindActionCreators(setLoaderStatus, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(AuthModule);
