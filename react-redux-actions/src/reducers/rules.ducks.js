import { handleActions, createAction } from 'redux-actions';
import rules from '../data.json';
import { createSelector } from 'reselect';

// Types
export const RULES_LOADED = 'RULES_LOADED';
export const DO_LIKE = 'DO_LIKE';
export const DO_DISLIKE = 'DO_DISLIKE';

// Actions
export const loadRules = createAction(RULES_LOADED, () => ({ rules }));
export const doLike = createAction(DO_LIKE, id => ({ id }));
export const doDislike = createAction(DO_DISLIKE, id => ({ id }));

// Selectors
const getRulesFromState = state => state.rules;
export const getRules = createSelector(getRulesFromState, rules => rules);
export const getRuleById = id => createSelector(getRules, rules => rules.find(rule => rule.id === id));

// Reducers
const newRulesCalculator = (rules, key, id) =>
  rules.map(rule => {
    if (rule.id === id) {
      return { ...rule, [key]: rule[key] + 1 };
    }
    return rule;
  });

export default handleActions(
  {
    [loadRules]: (state, action) => action.payload.rules,
    [doLike]: (state, action) => newRulesCalculator(state, 'likes', action.payload.id),
    [doDislike]: (state, action) => newRulesCalculator(state, 'dislikes', action.payload.id)
  },
  []
);
