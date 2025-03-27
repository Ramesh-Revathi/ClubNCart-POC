import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MdHeader from './MdHeader';

describe('<MdHeader />', () => {
  test('it should mount', () => {
    render(<MdHeader />);

    const mdHeader = screen.getByTestId('MdHeader');

    expect(mdHeader).toBeInTheDocument();
  });
});