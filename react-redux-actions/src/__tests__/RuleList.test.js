import React from 'react';
import { shallow } from 'enzyme';
import RuleList from '../RuleList';
import Rule from '../Rule';

const rules = [
  {
    id: 1,
    title: "If you don't have a mobile website, you don't have a website.",
    description:
      'In 2014, 50% of worldwide traffic uses mobile. A website must adapt the content for mobile.',
    likes: 0,
    dislikes: 0,
    tags: ['ui']
  },
  {
    id: 2,
    title: 'Leave the code cleaner than you found it.',
    description:
      'From Clean Code: always leave the code cleaner than it was before.',
    likes: 0,
    dislikes: 0,
    tags: ['craftsmanship', 'clean code']
  }
];

describe('RuleList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RuleList rules={rules} />);
  });

  it('should have as many Rule children as element in props.rules', () => {
    expect(wrapper.find(Rule)).toHaveLength(2);
  });

  it('should update rules on like', () => {
    wrapper.instance().handleThumbChange(1)('likes')();
    const initialeRule = rules.find(rule => rule.id === 1);
    const updatedRule = wrapper.state('rules').find(rule => rule.id === 1);
    expect(updatedRule.likes).toBe(initialeRule.likes + 1);
  });
});
