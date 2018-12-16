/**
 * Display a like (or dislike) button.
 * This button is initialized with a type (set on component props):
 * - If type is "up", then a click on this button will increment counter.
 * - If type is "down", then a click on this button will decrement counter.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class LikeBtn extends React.Component {
  constructor(props) {
    super(props);

    this.increment = this.increment.bind(this);
  }

  // Check if it is a "like" button or a "dislike" button.
  isUp() {
    return this.props.type === 'up';
  }

  // Increment counter.
  increment() {
    if (this.isUp()) {
      this.props.doLike();
    } else {
      this.props.doDislike();
    }
  }

  render() {
    const isUp = this.isUp();
    const rule = this.props.rule;
    const counter = isUp ? rule.likes : rule.dislikes;
    const title = isUp ? '+1' : '-1';
    const css = {
      'glyphicon-thumbs-up': isUp,
      'glyphicon-thumbs-down': !isUp,
    };

    return (
      <button className="btn btn-default" title={title} onClick={this.increment}>
        {counter} <i className={classNames('glyphicon', css)} />
      </button>
    );
  }
}

LikeBtn.propTypes = {
  type: PropTypes.oneOf(['up', 'down']).isRequired,
  rule: PropTypes.shape({
    likes: PropTypes.number,
    dislikes: PropTypes.number,
  }).isRequired,
  doLike: PropTypes.func.isRequired,
  doDislike: PropTypes.func.isRequired,
};

export default LikeBtn;
