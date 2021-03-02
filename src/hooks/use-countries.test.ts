import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useCountries } from './use-countries';
import { countries } from '../../__mocks__/countries';
import { defaultFilter } from '../CountryList/components/DefaultFilter';
import { Accessors, Filters, FilterStrategy } from './use-filter';

describe('useCountries', () => {
  const fetchSpy = jest.spyOn(window, 'fetch');
  const filtersStrategy: FilterStrategy = {
    [Filters.DEFAULT]: {
      filter: defaultFilter,
      FilterComponent: defaultFilter
    }
  };
  it('should use country', async () => {
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(countries)
      })
    );
    const { result, waitForNextUpdate } = renderHook(() => useCountries(filtersStrategy));
    await waitForNextUpdate();

    expect(result.current[0].countries[0].name).toEqual('Bouvet Island');

    const filter = { header: 'name', key: Accessors.NAME, filter: Filters.DEFAULT, filterValue: 'Af' };
    act(() => {
      result.current[1].setFilter(filter);
    });

    expect(result.current[0].countries[0].name).toEqual('Central African Republic');

    const desc = { key: 'population', order: 'desc' as const };

    act(() => {
      result.current[1].setSorting(desc);
    });
    expect(result.current[0].countries[0].name).toEqual('South Africa');
  });
});
