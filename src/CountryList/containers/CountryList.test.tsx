import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import { CountryListContainer } from './CountryList';
import { countries } from '../../../__mocks__/countries';

describe('CountryList', () => {
  const fetchSpy = jest.spyOn(window, 'fetch');
  it('should load and displays country list', async () => {
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(countries)
      })
    );
    const { queryByRole } = render(<CountryListContainer />);
    expect(queryByRole('loader')).toBeInTheDocument();

    await wait();

    expect(queryByRole('country-list')).toBeInTheDocument();
  });
  it('should show error message', async () => {
    fetchSpy.mockImplementationOnce(() => Promise.reject('Api down'));
    const { queryByRole } = render(<CountryListContainer />);
    expect(queryByRole('loader')).toBeInTheDocument();

    await wait();

    expect(queryByRole('country-list-error')).toBeInTheDocument();
  });
});
