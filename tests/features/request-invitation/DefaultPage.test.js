import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/request-invitation/DefaultPage';

describe('request-invitation/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      requestInvitation: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.request-invitation-default-page').length
    ).toBe(1);
  });
});
