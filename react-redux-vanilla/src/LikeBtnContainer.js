import { connect } from 'react-redux';
import { doLike, doDislike } from './actions/likes-actions';
import LikeBtn from './LikeBtn';

const mapDispatchToProps = (dispatch, ownProps) => ({
  doLike: () => {
    dispatch(doLike(ownProps.rule.id));
  },
  doDislike: () => {
    dispatch(doDislike(ownProps.rule.id));
  },
});

const LikeBtnContainer = connect(
  undefined,
  mapDispatchToProps,
)(LikeBtn);
export default LikeBtnContainer;
