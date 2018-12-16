import { connect } from 'react-redux';
import { doLike, doDislike } from './reducers/rules.ducks';
import LikeBtn from './LikeBtn';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () =>
    ownProps.down
      ? dispatch(doDislike(ownProps.ruleId))
      : dispatch(doLike(ownProps.ruleId))
});

export default connect(
  null,
  mapDispatchToProps
)(LikeBtn);
