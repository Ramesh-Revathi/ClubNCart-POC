import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MdAddressDetailsPopup from './MdAddressDetailsPopup';

describe('<MdAddressDetailsPopup />', () => {
  test('it should mount', () => {
    render(<MdAddressDetailsPopup />);

    const mdAddressDetailsPopup = screen.getByTestId('MdAddressDetailsPopup');

    expect(mdAddressDetailsPopup).toBeInTheDocument();
  });
});