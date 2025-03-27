import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddressBook from './AddressBook';

describe('<AddressBook />', () => {
  test('it should mount', () => {
    render(<AddressBook />);

    const addressBook = screen.getByTestId('AddressBook');

    expect(addressBook).toBeInTheDocument();
  });
});