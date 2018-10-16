import { connect } from "react-redux";
import { loadRules } from "../actions/rules-actions";
import RuleList from "../components/RuleList";
const mapStateToProps = (state, ownProps) => {
  return {
    rules: state.rules
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRules: () => {
      dispatch(loadRules());
    }
  };
};
const RuleListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RuleList);
export default RuleListContainer;
