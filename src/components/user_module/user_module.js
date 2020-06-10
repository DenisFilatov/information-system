import React, { Component } from "react";
import { toastr } from "react-redux-toastr";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setActiveComponent, setLoaderStatus, setUserData } from "../../store/actions";
import { getDecryptFile, setEncryptFile } from "../../utils/file_manager";
import { setUser, deleteUser } from "../../utils/user_manager";
import { generateKey } from "../../utils/crypto";
import { logOut } from "../../utils/helper";
import Loader from "../loader/loader";
import Topbar from "./topbar";
import Sidebar from "./sidebar";
import NewUserForm from "./new_user_form";
import UsersList from "./users_list";
import "./user_module.scss";

class UserModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: false,
      selected_item: "available_files"
    };
  }

  componentDidMount() {
    console.log("UM: ", this.props.keys);
    const data = { name: "file", content: "qwerty" };
    const file_name = setEncryptFile(data, this.props.keys);
    const decrypted_data = getDecryptFile(file_name, this.props.keys);
    console.log("decrypted_data", decrypted_data);
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
      { title: "Users list", name: "users_list", is_admin: true },
      { title: "Create user", name: "create_user", is_admin: true }
    ];
    const handleOnClick = selected_item => this.setState({ selected_item });
    return (
      <Sidebar
        header_text="MENU"
        items={items.filter(i => (this.props.is_admin ? true : !i.is_admin))}
        onClick={handleOnClick}
      />
    );
  }

  renderNewUserForm() {
    const handleOnSave = ({ username, password, level, admin_password }) => {
      this.setState({ is_loading: true });
      setTimeout(() => {
        const keys = (this.props.keys || []).slice(0, level);
        for (let i = keys.length; i < level; i++) {
          const new_key = generateKey();
          keys.push(new_key);
        }
        setUser(username, password, keys, false);
        if (keys.length > this.props.keys.length) {
          setUser("admin", admin_password, keys, true);
          this.props.setUserData({ keys });
        }
        this.setState({ is_loading: false });
        toastr.success("Notification", `User ${username} created successfully`);
      }, 500);
    };
    return <NewUserForm onSave={handleOnSave} />;
  }

  renderUsersList() {
    const handleOnDelete = username => {
      this.setState({ is_loading: true });
      setTimeout(() => {
        deleteUser(username);
        this.setState({ is_loading: false });
        toastr.success("Notification", `User ${username} deleted successfully`);
      }, 500);
    };
    return <UsersList onDelete={handleOnDelete} />;
  }

  renderLoader() {
    const { is_loading } = this.state;
    return <Loader source="props" position="absolute" is_active={is_loading} />;
  }

  renderSelectedItem() {
    const renderItem = () => {
      switch (this.state.selected_item) {
        case "users_list":
          return this.renderUsersList();
        case "create_user":
          return this.renderNewUserForm();
        default:
          return undefined;
      }
    };
    return (
      <div className="is-um-active_item">
        {renderItem()}
        {this.renderLoader()}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderTopbar()}
        {this.renderSidebar()}
        {this.renderSelectedItem()}
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
  setLoaderStatus: bindActionCreators(setLoaderStatus, dispatch),
  setUserData: bindActionCreators(setUserData, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserModule);
