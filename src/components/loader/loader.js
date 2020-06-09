import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import "./loader.scss";

class Loader extends Component {
  renderLoader() {
    return (
      <div
        className={classNames({
          "is-l-loader_fixed": this.props.position === "fixed",
          "is-l-loader_absolute": this.props.position === "absolute"
        })}
      >
        <img src="images/spinner.svg" alt="spinner" />
      </div>
    );
  }

  render() {
    switch (this.props.source) {
      case "store":
        return this.props.loader_status && this.renderLoader();
      case "props":
        return this.props.is_active && this.renderLoader();
      default:
        return undefined;
    }
  }
}

const mapStateToProps = store => ({
  loader_status: store.mainReducer.loader_status
});

export default connect(
  mapStateToProps,
  null
)(Loader);

Loader.defaultProps = {
  source: "props",
  position: "absolute",
  is_active: false
};

Loader.propTypes = {
  source: PropTypes.oneOf(["store", "props"]),
  position: PropTypes.oneOf(["fixed", "absolute"]),
  is_active: PropTypes.bool
};
