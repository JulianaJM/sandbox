/**
 * Display form rule.
 * Will be used to create or edit rules.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, formPropTypes } from 'redux-form';
import RuleTitleField from './RuleTitleField';
import RuleDescriptionField from './RuleDescriptionField';

function validateTitle(title) {
  if (!title) {
    return 'The title is required';
  } else if (title.length > 50) {
    return 'The title must be shorter than 50 characters';
  }
  return undefined;
}

function validateDescription(description) {
  if (description) {
    if (description.length > 100) {
      return 'The description must be shorter than 100 characters';
    } else if (description.length < 5) {
      return 'The description must be longer than 5 characters';
    }
  }
  return undefined;
}

class RuleForm extends React.Component {
  render() {
    const { rule, handleSubmit, submitting, invalid, pristine, updateRule, addRule } = this.props;
    const submitActionCreator = rule.id ? updateRule : addRule;

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">{rule.id ? 'Edit rule' : 'New rule'}</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSubmit(submitActionCreator)}>
            <Field name="title" component={RuleTitleField} validate={validateTitle} />
            <Field
              name="description"
              component={RuleDescriptionField}
              validate={validateDescription}
            />
            <button
              type="submit"
              className="btn btn-primary pull-right"
              disabled={invalid || submitting || pristine}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

RuleForm.defaultProps = {
  rule: {},
};

RuleForm.propTypes = {
  ...formPropTypes,
  rule: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default RuleForm;
