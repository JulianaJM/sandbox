import { RULES_LOADED } from "../actions/rules-actions";
const initialState = [];
export default function(state = initialState, action) {
  switch (action.type) {
    case RULES_LOADED:
      return action.payload.rules;
    default:
      return state;
  }
}
