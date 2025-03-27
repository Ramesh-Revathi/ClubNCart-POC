import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MdCategoryDisplay from './MdCategoryDisplay';

describe('<MdCategoryDisplay />', () => {
  test('it should mount', () => {
    render(<MdCategoryDisplay />);

    const mdCategoryDisplay = screen.getByTestId('MdCategoryDisplay');

    expect(mdCategoryDisplay).toBeInTheDocument();
  });
});