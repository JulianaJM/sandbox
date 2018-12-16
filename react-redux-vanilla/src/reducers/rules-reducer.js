import { findIndex } from 'lodash';
import { RULES_ADDED, RULES_LOADED, RULES_UPDATED } from '../actions/rules-actions';
import { DO_LIKE, DO_DISLIKE } from '../actions/likes-actions';

export default function rulesReducer(state = [], action) {
  switch (action.type) {
    case RULES_LOADED: {
      return action.rules;
    }

    case RULES_ADDED: {
      return [...state, action.rule];
    }

    case RULES_UPDATED: {
      const index = findIndex(state, { id: action.rule.id });
      const newRules = [...state];
      newRules[index] = action.rule;
      return newRules;
    }

    case DO_LIKE: {
      const index = findIndex(state, { id: action.id });
      const newRule = { ...state[index] };
      const newRules = [...state];
      newRule.likes += 1;
      newRules[index] = newRule;
      return newRules;
    }

    case DO_DISLIKE: {
      const index = findIndex(state, { id: action.id });
      const newRule = { ...state[index] };
      const newRules = [...state];
      newRule.dislikes += 1;
      newRules[index] = newRule;
      return newRules;
    }

    default:
      return state;
  }
}
