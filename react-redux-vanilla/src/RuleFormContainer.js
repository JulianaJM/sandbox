import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { find } from 'lodash';
import { addRule, updateRule } from './actions/rules-actions';
import RuleForm from './RuleForm';

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);

  return {
    rule: find(state.rules, { id }),
    initialValues: find(state.rules, { id }),
  };
};

const mapDispatchToProps = dispatch => ({
  addRule: rule => dispatch(addRule(rule)),
  updateRule: rule => dispatch(updateRule(rule)),
});

const RuleFormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'rule',
  }),
)(RuleForm);
export default RuleFormContainer;
