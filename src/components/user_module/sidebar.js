import React, { Component } from "react";
import PropTypes from "prop-types";
import "./user_module.scss";

export default class Sidebar extends Component {
  renderHeader() {
    const { header_text } = this.props;
    return <div className="is-s-header">{header_text}</div>;
  }

  renderItems() {
    const { items, onClick } = this.props;
    return (
      <div className="is-s-items">
        {items.map(i => (
          <div key={i.name} onClick={() => onClick(i.name)}>
            {i.title}
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="is-s-container">
        {this.renderHeader()}
        {this.renderItems()}
      </div>
    );
  }
}

Sidebar.defaultProps = {
  header_text: "Sidebar",
  items: [],
  onClick: name => console.log(name)
};

Sidebar.propTypes = {
  header_text: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string
    })
  ),
  onClick: PropTypes.func
};
