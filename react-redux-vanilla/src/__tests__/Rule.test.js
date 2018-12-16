/**
 * Unit test for Rule.js.
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';
import rules from '../data.json';
import Rule from '../Rule';

jest.mock('../LikeBtnContainer', () => 'likebtn');
jest.mock('react-router-dom', () => ({
  Link: 'a',
}));

describe('Rule', () => {
  let rule;
  let ruleElement;

  beforeEach(() => {
    rule = rules[0];
    ruleElement = <Rule rule={rule} />;
  });

  it('should render rule', () => {
    const component = TestUtils.renderIntoDocument(ruleElement);
    expect(component).not.toBe(null);

    const domNode = TestUtils.findRenderedComponentWithType(component, Rule);
    expect(domNode).not.toBe(null);

    const panelHeader = TestUtils.findRenderedDOMComponentWithClass(component, 'panel-heading');
    expect(panelHeader).toBeDefined();
    expect(panelHeader.textContent).toEqual(rule.title);

    const panelBody = TestUtils.findRenderedDOMComponentWithClass(component, 'panel-body');
    expect(panelBody).toBeDefined();
    expect(panelBody.textContent).toEqual(rule.description);

    const panelFooter = TestUtils.findRenderedDOMComponentWithClass(component, 'panel-footer');
    expect(panelFooter).toBeDefined();
  });

  it('should display a rule using shallow rendering', () => {
    const renderer = new ShallowRenderer();

    renderer.render(ruleElement);

    const result = renderer.getRenderOutput();

    expect(result).toBeDefined();
    expect(result.props.className).toBe('panel panel-primary');

    const children = result.props.children;
    expect(children.length).toBe(3);

    const panelHeader = children[0];
    const panelBody = children[1];
    const panelFooter = children[2];

    // Check header
    expect(panelHeader.props.className).toBe('panel-heading');
    expect(panelHeader.props.children[0]).toBe(rule.title);

    // Check body
    expect(panelBody.props.children).toEqual(<p>{rule.description}</p>);

    // Check footer
    expect(panelFooter.props.className).toBe('panel-footer');
  });
});
