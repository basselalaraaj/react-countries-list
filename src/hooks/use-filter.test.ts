import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Accessors, Filters, FilterStrategy, useFilter } from './use-filter';
import { countries } from '../../__mocks__/countries';
import { defaultFilter } from '../CountryList/components/DefaultFilter';

describe('useFilter', () => {
  const filtersStrategy: FilterStrategy = {
    [Filters.DEFAULT]: {
      filter: defaultFilter,
      FilterComponent: defaultFilter
    }
  };
  it('should use filter', async () => {
    const { result } = renderHook(() => useFilter(filtersStrategy, countries));
    expect(result.current[0]).toEqual(countries);
    expect(typeof result.current[1]).toBe('function');
  });
  it('should set filter', async () => {
    const { result } = renderHook(() => useFilter(filtersStrategy, countries));
    expect(result.current[0]).toEqual(countries);
    expect(typeof result.current[1]).toBe('function');

    const filter = { header: 'name', key: Accessors.NAME, filter: Filters.DEFAULT, filterValue: 'Afghanistan' };
    act(() => {
      result.current[1](filter);
    });

    expect(result.current[0][0].name).toEqual('Afghanistan');
  });
});
