import React, { Component } from "react";
import PropTypes from "prop-types";
import "./common_components.scss";

export default class TextInput extends Component {
  renderInput() {
    const { value, placeholder, text_security, disabled, onChange } = this.props;
    const type = text_security ? "password" : "text";
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

TextInput.defaultProps = {
  value: "",
  placeholder: "Input",
  text_security: false,
  disabled: false,
  onChange: value => console.log(value)
};
TextInput.propTypes = {
  value: PropTypes.any,
  class_name: PropTypes.string,
  placeholder: PropTypes.string,
  text_security: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};
