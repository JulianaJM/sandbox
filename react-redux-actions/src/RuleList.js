import React, { Component } from 'react';
import Rule from './Rule';

const newRulesCalculator = (rules, key, id) =>
  rules.map(rule => {
    if (rule.id === id) {
      return { ...rule, [key]: rule[key] + 1 };
    }
    return rule;
  });

class RuleList extends Component {
  componentDidMount() {
    this.props.loadRules();
  }

  handleThumbChange = id => thumbOrientation => () => {
    const { rules } = this.state;

    const newRules = newRulesCalculator(rules, thumbOrientation, id);

    this.setState({ rules: newRules });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.rules.map(rule => (
          <Rule
            {...rule}
            key={rule.id}
            onThumbChange={this.handleThumbChange(rule.id)}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default RuleList;
