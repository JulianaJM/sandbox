/**
 * Likes Actions.
 * Available actions:
 * - Do Like: post new like.
 * - Do Dislike: post new dislike.
 */

import superagent from 'superagent';

export const DO_LIKE = 'DO_LIKE';
export function doLike(id) {
  return (dispatch) => {
    superagent.post(`/rest/rules/${id}/likes`)
      .set('Accept', 'application/json')
      .end(() => {
        dispatch({
          type: DO_LIKE,
          id,
        });
      });
  };
}

export const DO_DISLIKE = 'DO_DISLIKE';
export function doDislike(id) {
  return (dispatch) => {
    superagent.post(`/rest/rules/${id}/dislikes`)
      .set('Accept', 'application/json')
      .end(() => {
        dispatch({
          type: DO_DISLIKE,
          id,
        });
      });
  };
}
