import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MdPageHeader from './MdPageHeader';

describe('<MdPageHeader />', () => {
  test('it should mount', () => {
    render(<MdPageHeader />);

    const mdPageHeader = screen.getByTestId('MdPageHeader');

    expect(mdPageHeader).toBeInTheDocument();
  });
});