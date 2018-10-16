/**
 * Display a single rule.
 * Rule to display is set with the key `rule` on
 * the component props.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import LikeBtn from "./LikeBtn";
import "./Rule.css";

class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folded: !props.rule.description,
      likes: 0,
      dislikes: 0
    };
  }

  // Update folded state.
  // - If folded is currently `true`, turn it to `false`.
  // - If folded is currently `false`, turn it to `true`.
  toggleFolded = () => {
    this.setState({
      folded: !this.state.folded
    });
  };

  handleLikes = () => {
    this.setState({
      likes: this.state.likes + 1
    });
  };

  handleDislikes = () => {
    this.setState({
      dislikes: this.state.dislikes + 1
    });
  };

  render() {
    const rule = this.props.rule;
    const tags = rule.tags.map(tag => (
      <span key={tag} className="badge">
        {tag}
      </span>
    ));
    const { folded, likes, dislikes } = this.state;
    return (
      <div className="panel panel-primary">
        <div
          className="panel-heading"
          role="presentation"
          onClick={this.toggleFolded}
        >
          {rule.title}
          <i
            className={classNames("pull-right", "glyphicon", {
              "glyphicon-chevron-down": !folded,
              "glyphicon-chevron-up": folded
            })}
          />
        </div>
        <div className={classNames("panel-body", { hidden: folded })}>
          <p>{rule.description}</p>
        </div>
        <div className="panel-footer">
          <div className="btn-toolbar">
            {tags}
            <div className="btn-group btn-group-xs pull-right">
              <a className="btn btn-primary" title="Update">
                <i className="glyphicon glyphicon-pencil" />
              </a>
            </div>
            <div className="btn-group btn-group-xs pull-right">
              <LikeBtn type="up" counter={likes} onClick={this.handleLikes} />
              <LikeBtn
                type="down"
                counter={dislikes}
                onClick={this.handleDislikes}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Rule.propTypes = {
  rule: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    likes: PropTypes.number,
    dislikes: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default Rule;
