import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Country } from './Country';
import { countries } from '../../../__mocks__/countries';

describe('Country', () => {
  it('loads and displays country', async () => {
    const { queryByText } = render(<Country country={countries[0]} />);
    expect(queryByText(countries[0].name)).toBeInTheDocument();
  });
  it('displays country details', async () => {
    const { queryByText } = render(<Country country={countries[0]} />);

    expect(queryByText(countries[0].name)).toBeInTheDocument();
    expect(queryByText(/Kabul/i)).not.toBeInTheDocument();

    fireEvent.click(queryByText(countries[0].name));

    expect(queryByText(/Kabul/i)).toBeInTheDocument();
  });
});
