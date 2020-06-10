import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { getFileNamesList, getDecryptFile } from "../../utils/file_manager";
import Button from "../common_components/button";
import "./user_module.scss";

export default class AvailableFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      active_file_index: null
    };
  }

  componentDidMount() {
    this.updateFiles();
  }

  componentWillUnmount() {
    this.props.setRelativeLoader(false);
  }

  updateFiles() {
    this.props.setRelativeLoader(true);
    setTimeout(() => {
      const files = [];
      const file_names_list = getFileNamesList().filter(i => Number.isInteger(+i));
      file_names_list.forEach(name => {
        const file = getDecryptFile(name, this.props.keys);
        if (file) files.push(file);
      });
      this.setState({ files, active_file_index: null });
      this.props.setRelativeLoader(false);
    }, 500);
  }

  renderFileList() {
    const { files, active_file_index } = this.state;
    const handleOnSelectFile = active_file_index => this.setState({ active_file_index });
    return (
      <div className="is-af-file_list">
        {files.map((file, index) => (
          <div
            key={index}
            className={classNames({ "is-af-file_list-selected_item": active_file_index === index })}
            onClick={() => handleOnSelectFile(index)}
          >
            {file.name}
          </div>
        ))}
      </div>
    );
  }

  renderActiveFile() {
    const { files, active_file_index } = this.state;
    const content = files[active_file_index] && files[active_file_index].content;
    if (!content) return <div className="is-af-active_file_info">Select file from the list</div>;
    return <div className="is-af-active_file">{content}</div>;
  }

  renderFileViewer() {
    if (!this.state.files.length) {
      return (
        <div className="is-af-file_viewer_info">
          <img src="https://icongr.am/clarity/search.svg?size=20&color=747474" alt="search" />
          <span>There are no available files</span>
        </div>
      );
    }
    return (
      <div className="is-af-file_viewer">
        {this.renderFileList()}
        {this.renderActiveFile()}
      </div>
    );
  }

  renderUpdateButton() {
    const handleOnClick = () => this.updateFiles();
    return <Button class_name="is-af-update_button" text="UPDATE" onClick={handleOnClick} />;
  }

  render() {
    return (
      <div className="is-af-container">
        <div className="is-af-header">Available Files</div>
        {this.renderFileViewer()}
        {this.renderUpdateButton()}
      </div>
    );
  }
}

AvailableFiles.defaultProps = {
  keys: [],
  setRelativeLoader: status => console.log(status)
};
AvailableFiles.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string),
  setRelativeLoader: PropTypes.func
};
