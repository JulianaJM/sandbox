import React from 'react';
import LikeBtn from '../components/LikeBtn';
import { shallow } from 'enzyme';

describe('<LikeBtn/>', () => {

    test('should render', () => {
        const wrapper = shallow(<LikeBtn type="up" />);
        expect(wrapper.instance().props.counter).toEqual(0);
    });

    test('should increment counter', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<LikeBtn onClick={onClick} type="up" />);
        expect(wrapper.instance().props.counter).toEqual(0);

        wrapper.simulate('click');

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});