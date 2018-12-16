import { connect } from 'react-redux';
import RuleList from './RuleList';
import { loadRules, getRules, getRuleById } from './reducers/rules.ducks';

const mapStateToProps = state => ({
  rules: getRules(state),
  rule: getRuleById(1)(state)
});

const mapDispatchToProps = {
  loadRules
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RuleList);
