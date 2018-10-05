import React from 'react';
import { shallow } from 'enzyme';
import rules from '../data.json';
import RuleList from '../components/RuleList';
import Rule from '../components/Rule';

describe('Rule List', () => {
  let loadRules;
  let wrapper;

  beforeEach(() => {
    loadRules = jest.fn();
    wrapper = shallow(<RuleList rules={rules} loadRules={loadRules} />);
  });

  test('should have as many Rule children as element in props.rules', () => {
    expect(wrapper.find(Rule)).toHaveLength(4);
  });

  test('should call the loadRules callback', () => {
    wrapper.instance().componentDidMount();
    expect(loadRules).toHaveBeenCalledTimes(2);
  });
});