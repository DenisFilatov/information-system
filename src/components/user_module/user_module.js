import React, { Component } from "react";
import { toastr } from "react-redux-toastr";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setActiveComponent, setLoaderStatus } from "../../store/actions";
import { logOut } from "../../utils/helper";
import Loader from "../loader/loader";
import Topbar from "./topbar";
import Sidebar from "./sidebar";
import "./user_module.scss";

class UserModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: false,
      active_menu_item: "available_files"
    };
  }

  renderTopbar() {
    const { username, keys, is_admin, setActiveComponent, setLoaderStatus } = this.props;
    const user_level = `${is_admin ? "∞" : (keys || []).length}`;
    const handleOnLogOut = () => {
      setLoaderStatus(true);
      logOut();
      setTimeout(() => {
        setActiveComponent("auth_module");
        setLoaderStatus(false);
        toastr.success("Notification", `Bye, ${username}! Сome back sooner.`);
      }, 500);
    };
    return <Topbar username={username} user_level={user_level} onLogOut={handleOnLogOut} />;
  }

  renderSidebar() {
    const items = [
      { title: "Available files", name: "available_files", is_admin: false },
      { title: "Add file", name: "add_file", is_admin: false },
      { title: "Add user", name: "add_user", is_admin: true }
    ];
    const handleOnClick = active_menu_item => this.setState({ active_menu_item });
    return (
      <Sidebar
        header_text="MENU"
        items={items.filter(i => (this.props.is_admin ? true : i.is_admin))}
        onClick={handleOnClick}
      />
    );
  }

  renderLoader() {
    const { is_loading } = this.state;
    return <Loader source="props" position="absolute" is_active={is_loading} />;
  }

  renderActiveItem() {
    return (
      <div className="is-um-active_item">
        <div>UserModule</div>
        {this.renderLoader()}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderTopbar()}
        {this.renderSidebar()}
        {this.renderActiveItem()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  is_admin: store.mainReducer.is_admin,
  username: store.mainReducer.username,
  keys: store.mainReducer.keys
});

const mapDispatchToProps = dispatch => ({
  setActiveComponent: bindActionCreators(setActiveComponent, dispatch),
  setLoaderStatus: bindActionCreators(setLoaderStatus, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserModule);
