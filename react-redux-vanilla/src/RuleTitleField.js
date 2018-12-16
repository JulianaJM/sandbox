/**
 * Title form field.
 * Must be used with the Redux-form Field component only.
 */

import React from 'react';
import { fieldPropTypes } from 'redux-form';
import classNames from 'classnames';

class RuleTitleField extends React.Component {
  render() {
    const { touched, error } = this.props.meta;
    return (
      <div className={classNames('form-group', { 'has-error': touched && error })}>
        <label className="control-label" htmlFor="rule-title">Title</label>
        <input
          {...this.props.input}
          type="text"
          className="form-control"
          id="rule-title"
          placeholder="Title"
        />
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    );
  }
}

RuleTitleField.propTypes = fieldPropTypes;

export default RuleTitleField;
