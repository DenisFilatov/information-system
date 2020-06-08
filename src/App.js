import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { remote } from "electron";
import path from "path";
import fs from "fs";
import { setActiveComponent, setLoaderStatus } from "./store/actions";
import { AUXILIARY_FOLDER, USERS_FILE } from "./configs/global";
import AuthModule from "./components/auth_module/auth_module";
import InitModule from "./components/init_module/init_module";
import "./App.scss";

class App extends Component {
  componentDidMount() {
    this.props.setActiveComponent("init_module");
    this.props.setLoaderStatus(false);
    // const users_file_path = path.join(path.dirname(remote.app.getAppPath()), AUXILIARY_FOLDER, USERS_FILE);
    // if (fs.existsSync(users_file_path)) this.props.setActiveComponent("auth_module");
    // else this.props.setActiveComponent("init_module");
  }

  renderActiveComponent() {
    switch (this.props.active_component) {
      case "init_module":
        return <InitModule />;
      case "auth_module":
        return <AuthModule />;
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
