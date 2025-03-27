import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TosatNotifyCommon from './TosatNotifyCommon';

describe('<TosatNotifyCommon />', () => {
  test('it should mount', () => {
    render(<TosatNotifyCommon />);

    const tosatNotifyCommon = screen.getByTestId('TosatNotifyCommon');

    expect(tosatNotifyCommon).toBeInTheDocument();
  });
});