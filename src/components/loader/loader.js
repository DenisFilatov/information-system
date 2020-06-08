import React, { Component } from "react";
import { connect } from "react-redux";
import "./loader.scss";

class Loader extends Component {
  renderSpinner() {
    return (
      <div className="is-l-container">
        <img src="images/spinner.svg" alt="spinner" />
      </div>
    );
  }

  render() {
    return this.props.loader_status && this.renderSpinner();
  }
}

const mapStateToProps = store => ({
  loader_status: store.mainReducer.loader_status
});

export default connect(
  mapStateToProps,
  null
)(Loader);
