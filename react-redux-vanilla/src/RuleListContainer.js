import { connect } from 'react-redux';
import { loadRules } from './actions/rules-actions';
import RuleList from './RuleList';


const mapStateToProps = ({ rules }) => ({
  rules,
});

const mapDispatchToProps = dispatch => ({
  loadRules: () => {
    dispatch(loadRules());
  },
});

const RuleListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RuleList);
export default RuleListContainer;
