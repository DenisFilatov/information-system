import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import "./common_components.scss";

export default class DropZone extends Component {
  renderDropZone() {
    const { multiple, disabled, onDrop } = this.props;
    return (
      <Dropzone multiple={multiple} disabled={disabled} onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div className="is-dz-active_place" {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="is-dz-information_message">
              <img src="images/folder-open.svg" alt="folder" />
              <span>Browse or Drag and Drop To Upload</span>
            </div>
          </div>
        )}
      </Dropzone>
    );
  }

  render() {
    return <div className="is-dz-drop_zone">{this.renderDropZone()}</div>;
  }
}

DropZone.defaultProps = {
  multiple: true,
  disabled: false,
  onDrop: files => console.log(files)
};
DropZone.propTypes = {
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  onDrop: PropTypes.func
};
