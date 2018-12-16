/**
 * Unit tests for LikeBtn.js
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import rules from '../data.json';
import Btn from '../LikeBtn';

describe('LikeBtn', () => {
  let rule;
  const actions = {};

  beforeEach(() => {
    rule = _.cloneDeep(rules[0]);
    actions.doLike = jest.fn();
    actions.doDislike = jest.fn();
  });

  it('should increment counter up', () => {
    const button = <Btn type="up" rule={rule} {...actions} />;

    const instance = TestUtils.renderIntoDocument(button);
    const component = TestUtils.findRenderedComponentWithType(instance, Btn);
    const domNode = ReactDOM.findDOMNode(component);

    TestUtils.Simulate.click(domNode);

    expect(actions.doLike).toBeCalled();
    expect(actions.doDislike).not.toBeCalled();
  });

  it('should increment counter down', () => {
    const button = <Btn type="down" rule={rule} {...actions} />;

    const instance = TestUtils.renderIntoDocument(button);
    const component = TestUtils.findRenderedComponentWithType(instance, Btn);
    const domNode = ReactDOM.findDOMNode(component);

    TestUtils.Simulate.click(domNode);

    expect(actions.doDislike).toBeCalled();
    expect(actions.doLike).not.toBeCalled();
  });
});
