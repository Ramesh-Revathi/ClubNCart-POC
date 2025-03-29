import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrivacyPolicy from './PrivacyPolicy';

describe('<PrivacyPolicy />', () => {
  test('it should mount', () => {
    render(<PrivacyPolicy />);

    const privacyPolicy = screen.getByTestId('PrivacyPolicy');

    expect(privacyPolicy).toBeInTheDocument();
  });
});