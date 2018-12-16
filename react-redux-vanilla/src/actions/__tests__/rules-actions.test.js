/**
 * Unit Tests for rules-actions.js.
 */

import _ from 'lodash';
import superagent from 'superagent';
import rules from '../../data.json';
import * as actions from '../rules-actions';

describe('Rules Actions', () => {
  superagent.end.mockImplementation((callback) => {
    callback(null, {
      ok: true,
      body: _.cloneDeep(rules),
    });
  });

  it('should load rules', () => {
    const data = _.cloneDeep(rules);

    const dispatch = jest.fn();
    actions.loadRules()(dispatch);

    expect(dispatch).toBeCalledWith({
      type: 'RULES_LOADED',
      rules: data,
    });
  });
});
