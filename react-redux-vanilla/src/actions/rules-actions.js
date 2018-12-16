/**
 * Rules Actions.
 * Available actions:
 * - Load Rules: fetch data and dispatch `RULES_LOADED` using the dispatcher.
 */
import superagent from 'superagent';

export const RULES_LOADED = 'RULES_LOADED';
export function loadRules() {
  return (dispatch) => {
    superagent.get('/rest/rules')
      .set('Accept', 'application/json')
      .end((err, res) => {
        dispatch({
          type: RULES_LOADED,
          rules: res.body,
        });
      });
  };
}

export const RULES_ADDED = 'RULES_ADDED';
export function addRule(rule) {
  return (dispatch) => {
    superagent.post('/rest/rules')
      .send(rule)
      .set('Accept', 'application/json')
      .end((err, res) => {
        dispatch({
          type: RULES_ADDED,
          rule: res.body,
        });
      });
  };
}

export const RULES_UPDATED = 'RULES_UPDATED';
export function updateRule(rule) {
  return (dispatch) => {
    superagent.put(`/rest/rules/${rule.id}`)
      .send(rule)
      .set('Accept', 'application/json')
      .end((err, res) => {
        dispatch({
          type: RULES_UPDATED,
          rule: res.body,
        });
      });
  };
}
