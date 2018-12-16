import React from 'react';
import TestUtils from 'react-dom/test-utils';
import rules from '../data.json';
import Rule from '../Rule';

describe('Rule component', () => {
  let rule;
  let onThumbChange;
  let props;
  let ruleElement;

  beforeEach(() => {
    rule = rules[0];
    onThumbChange = jest.fn();

    props = { ...rule, onThumbChange };

    ruleElement = <Rule {...props} />;
  });

  it('should render rule', () => {
    const component = TestUtils.renderIntoDocument(ruleElement);
    expect(component).not.toBe(null);

    expect(TestUtils.isElement(ruleElement)).toBe(true);
    expect(TestUtils.isElementOfType(ruleElement, Rule)).toBe(true);

    const domNode = TestUtils.findRenderedComponentWithType(component, Rule);
    expect(domNode).toBeDefined();

    const panelHeader = TestUtils.findRenderedDOMComponentWithClass(
      component,
      'panel-heading'
    );
    expect(panelHeader).toBeDefined();
    expect(panelHeader.textContent).toEqual(rule.title);
  });
});
