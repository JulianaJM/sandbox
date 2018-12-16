/**
 * Unit Tests for likes-actions.js.
 */

import superagent from 'superagent';
import * as actions from '../likes-actions';

describe('Likes Actions', () => {
  beforeEach(() => {
    superagent.end.mockImplementation((callback) => {
      callback(null, {
        ok: true,
      });
    });
  });

  it('should post like', () => {
    const dispatch = jest.fn();
    actions.doLike(5)(dispatch);
    expect(dispatch).toBeCalledWith({
      type: 'DO_LIKE',
      id: 5,
    });
  });

  it('should post dislike', () => {
    const dispatch = jest.fn();
    actions.doDislike(15)(dispatch);
    expect(dispatch).toBeCalledWith({
      type: 'DO_DISLIKE',
      id: 15,
    });
  });
});
