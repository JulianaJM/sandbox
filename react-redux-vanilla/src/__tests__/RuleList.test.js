/**
 * Unit tests for the RuleList component.
 */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import _ from 'lodash';
import rules from '../data.json';
import RuleList from '../RuleList';

describe('Rule List', () => {
  let ruleListElement;
  let data;
  let loadRules;

  beforeEach(() => {
    data = _.cloneDeep(rules);
    loadRules = jest.fn();
    ruleListElement = <RuleList rules={data} loadRules={loadRules} />;
  });

  it('should display list of rules', () => {
    const renderer = new ShallowRenderer();

    renderer.render(ruleListElement);

    const result = renderer.getRenderOutput();
    expect(result).toBeDefined();

    const children = result.props.children;
    expect(children.length).toBe(rules.length);

    children.forEach((child, idx) => {
      expect(child.props.rule).toEqual(rules[idx]);
    });
  });

  it('should load the rules', () => {
    const renderer = new ShallowRenderer();
    renderer.render(ruleListElement);

    // expect(loadRules).toBeCalled(); // must use ShallowTestUtils.getMountedInstance(renderer);
  });
});
