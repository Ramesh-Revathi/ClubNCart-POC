import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppFooterSection from './AppFooterSection';

describe('<AppFooterSection />', () => {
  test('it should mount', () => {
    render(<AppFooterSection />);

    const appFooterSection = screen.getByTestId('AppFooterSection');

    expect(appFooterSection).toBeInTheDocument();
  });
});