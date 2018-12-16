import React from 'react';
import { shallow } from 'enzyme';

import LikeBtn from '../LikeBtn';

describe('LikeBtn', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      onClick: jest.fn()
    };

    wrapper = shallow(<LikeBtn {...props} />);
  });

  it('should use onClick function when clicked', () => {
    expect(props.onClick).not.toHaveBeenCalled();
    wrapper.simulate('click');
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
