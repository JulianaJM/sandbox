import rules from "../data.json";

export const RULES_LOADED = "RULES_LOADED";
export const loadRules = () => ({
  type: RULES_LOADED,
  payload: { rules: rules }
});
