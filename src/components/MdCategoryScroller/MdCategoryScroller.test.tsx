import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MdCategoryScroller from './MdCategoryScroller';

describe('<MdCategoryScroller />', () => {
  test('it should mount', () => {
    render(<MdCategoryScroller />);

    const mdCategoryScroller = screen.getByTestId('MdCategoryScroller');

    expect(mdCategoryScroller).toBeInTheDocument();
  });
});