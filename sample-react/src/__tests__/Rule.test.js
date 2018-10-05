import React from 'react';
import { shallow } from 'enzyme';
import Rule from '../components/Rule';

describe('<Rule/>', () => {
    let rule;
    beforeAll(() => {
        rule = {
            title: 'toto',
            tags: [],
        };
    });

    test('should render', () => {
        const wrapper = shallow(<Rule rule={rule} />);
        expect(wrapper.props().className).toEqual('panel panel-primary');
        expect(wrapper.instance().props.title).toEqual(rule.title);
    });
});