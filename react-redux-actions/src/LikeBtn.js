import React from 'react';

const LikeBtn = ({ value = 0, down, onClick }) => (
  <button
    className="btn btn-default"
    title={down ? '-1' : '+1'}
    onClick={onClick}
  >
    {value}{' '}
    <i
      className={`glyphicon ${
        down ? 'glyphicon-thumbs-down' : 'glyphicon-thumbs-up'
      }`}
    />
  </button>
);

export default LikeBtn;
