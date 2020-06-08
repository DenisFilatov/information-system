import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as _path from "path";
import { AUXILIARY_FOLDER, USERS_FOLDER } from "./configs/global";
import { setActiveComponent, setLoaderStatus } from "./store/actions";
import { getAppPath, existItem } from "./utils/fs_assistant";
import InitModule from "./components/init_module/init_module";
import AuthModule from "./components/auth_module/auth_module";
import UserModule from "./components/user_module/user_module";
import "./App.scss";

class App extends Component {
  componentDidMount() {
    const admin_file_path = _path.join(getAppPath(), AUXILIARY_FOLDER, USERS_FOLDER, "admin");
    if (existItem(admin_file_path)) this.props.setActiveComponent("auth_module");
    else this.props.setActiveComponent("init_module");
  }

  renderActiveComponent() {
    switch (this.props.active_component) {
      case "init_module":
        return <InitModule />;
      case "auth_module":
        return <AuthModule />;
      case "user_module":
        return <UserModule />;
      default:
        return undefined;
    }
  }

  render() {
    return <div className="is-app-container">{this.renderActiveComponent()}</div>;
  }
}

const mapStateToProps = store => ({
  active_component: store.mainReducer.active_component
});
const mapDispatchToProps = dispatch => ({
  setActiveComponent: bindActionCreators(setActiveComponent, dispatch),
  setLoaderStatus: bindActionCreators(setLoaderStatus, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
