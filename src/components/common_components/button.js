import React, { Component } from "react";
import PropTypes from "prop-types";
import "./common_components.scss";

export default class Button extends Component {
  renderButton() {
    const { text, onClick } = this.props;
    return (
      <div className="is-b-button" onClick={onClick}>
        {text}
      </div>
    );
  }
  render() {
    return <div className={this.props.class_name}>{this.renderButton()}</div>;
  }
}

Button.defaultProps = {
  text: "Button",
  disabled: false,
  onClick: () => console.log("Click")
};
Button.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  class_name: PropTypes.string,
  onClick: PropTypes.func
};
