/**
 * Display a like (or dislike) button.
 * This button is initialized with a type (set on component props):
 * - If type is "up", then a click on this button will increment counter.
 * - If type is "down", then a click on this button will decrement counter.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const LikeBtn = props => {
  const isUp = props.type === "up";
  const title = isUp ? "+1" : "-1";
  const css = {
    "glyphicon-thumbs-up": isUp,
    "glyphicon-thumbs-down": !isUp
  };

  return (
    <button className="btn btn-default" title={title} onClick={props.onClick}>
      {props.counter} <i className={classNames("glyphicon", css)} />
    </button>
  );
};

LikeBtn.propTypes = {
  type: PropTypes.oneOf(["up", "down"]).isRequired,
  counter: PropTypes.number
};

export default LikeBtn;
