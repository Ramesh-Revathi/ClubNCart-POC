import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FAQs from './FAQs';

describe('<FAQs />', () => {
  test('it should mount', () => {
    render(<FAQs />);

    const faQs = screen.getByTestId('FAQs');

    expect(faQs).toBeInTheDocument();
  });
});