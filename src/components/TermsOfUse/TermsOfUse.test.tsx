import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TermsOfUse from './TermsOfUse';

describe('<TermsOfUse />', () => {
  test('it should mount', () => {
    render(<TermsOfUse />);

    const termsOfUse = screen.getByTestId('TermsOfUse');

    expect(termsOfUse).toBeInTheDocument();
  });
});