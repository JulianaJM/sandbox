/**
 * Description form field.
 * Must be used with the Redux-form Field component only.
 */

import React from 'react';
import { fieldPropTypes } from 'redux-form';
import classNames from 'classnames';

class RuleDescriptionField extends React.Component {
  render() {
    const { touched, error } = this.props.meta;
    return (
      <div className={classNames('form-group', { 'has-error': touched && error })}>
        <label className="control-label" htmlFor="rule-desc">Description</label>
        <textarea
          {...this.props.input}
          className="form-control"
          id="rule-desc"
          placeholder="Description"
        />
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    );
  }
}

RuleDescriptionField.propTypes = fieldPropTypes;

export default RuleDescriptionField;
