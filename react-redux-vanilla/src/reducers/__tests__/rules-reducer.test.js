/**
 * Unit Tests for rules-reducer.js.
 */

import _ from 'lodash';
import rules from '../../data.json';
import reducer from '../rules-reducer';

describe('Rules reducer', () => {
  let data;

  beforeEach(() => {
    data = _.cloneDeep(rules);
  });


  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should load rules', () => {
    const initialState = [];
    const newState = reducer(initialState, {
      type: 'RULES_LOADED',
      rules,
    });
    expect(newState).not.toBe(initialState);
    expect(newState).toEqual(data);
  });

  it('should increment likes', () => {
    const initialState = rules;
    expect(initialState[0].likes).toBe(0);
    const newState = reducer(initialState, {
      type: 'DO_LIKE',
      id: 1,
    });
    expect(newState[0].likes).toBe(1);
  });

  it('should increment dislikes', () => {
    const initialState = rules;
    expect(initialState[0].dislikes).toBe(0);
    const newState = reducer(initialState, {
      type: 'DO_DISLIKE',
      id: 1,
    });
    expect(newState[0].dislikes).toBe(1);
  });
});
