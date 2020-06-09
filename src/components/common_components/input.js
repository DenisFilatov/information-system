import React, { Component } from "react";
import PropTypes from "prop-types";
import "./common_components.scss";

export default class Input extends Component {
  renderInput() {
    const { value, type, placeholder, disabled, onChange } = this.props;
    return (
      <input
        type={type}
        className="is-ti-input"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
      />
    );
  }
  render() {
    return <div className={this.props.class_name}>{this.renderInput()}</div>;
  }
}

Input.defaultProps = {
  value: "",
  type: "text",
  placeholder: "Input",
  disabled: false,
  onChange: value => console.log(value)
};
Input.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string,
  class_name: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};
