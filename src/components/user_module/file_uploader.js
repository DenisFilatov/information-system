import React, { Component } from "react";
import PropTypes from "prop-types";
import { toastr } from "react-redux-toastr";
import DropZone from "../common_components/drop_zone";
import Button from "../common_components/button";
import "./user_module.scss";

export default class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  renderFileList() {
    const { files } = this.state;
    if (!files.length) return undefined;
    const handleOnChangeLevel = (index, level) => {
      if (level < 0 || level > this.props.user_level) return undefined;
      const changed_files = files.slice();
      changed_files[index].level = +level;
      this.setState({ files: changed_files });
    };
    const handleOndeleteFile = index => {
      const changed_files = files.slice();
      changed_files.splice(index, 1);
      this.setState({ files: changed_files });
    };
    const file_list = files.map((file, index) => (
      <div key={index} className="is-fu-file">
        <div className="is-fu-file_title">{file.name}</div>
        <div className="is-fu-file_menu">
          <input
            type="number"
            value={file.level}
            onChange={e => handleOnChangeLevel(index, e.target.value)}
          />
          <img src="images/trash.svg" alt="trash" onClick={() => handleOndeleteFile(index)} />
        </div>
      </div>
    ));
    return <div className="is-fu-file_list">{file_list}</div>;
  }

  renderDropZone() {
    const handleOnDrop = value => {
      const new_files = value.map(({ name, path, type }) => ({ name, path, type, level: 0 }));
      this.setState(prevState => ({ files: [...prevState.files, ...new_files] }));
    };
    return (
      <div className="is-fu-drop_zone">
        <DropZone multiple={true} onDrop={handleOnDrop} />
      </div>
    );
  }

  renderSaveButton() {
    const handleOnClick = () => {
      if (!this.state.files.length) {
        toastr.warning("Warning", "Browse or drag and drop file into area to save");
        return undefined;
      }
      this.props.onSave(this.state.files);
      this.setState({ files: [] });
    };
    return <Button class_name="is-fu-save_button" text="SAVE" onClick={handleOnClick} />;
  }

  render() {
    return (
      <div className="is-fu-container">
        <div className="is-fu-header">File Uploader</div>
        {this.renderFileList()}
        {this.renderDropZone()}
        {this.renderSaveButton()}
      </div>
    );
  }
}

FileUploader.defaultProps = {
  user_level: 0,
  onSave: files => console.log(files)
};
FileUploader.propTypes = {
  user_level: PropTypes.number,
  onSave: PropTypes.func
};
