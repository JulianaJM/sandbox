/**
 * Display list of rules.
 * The rules are provided under the key `rules` in
 * the component props.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Rule from './Rule';

class RuleList extends React.Component {
  render() {
    const elements = this.props.rules.map(rule => <Rule key={rule.id} rule={rule} />);
    return (
      <div>{elements}</div>
    );
  }
}

RuleList.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default RuleList;
