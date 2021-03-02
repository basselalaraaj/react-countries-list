import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useSort } from './use-sort';
import { countries } from '../../__mocks__/countries';

describe('useSort', () => {
  it('should use sort', async () => {
    const { result } = renderHook(() => useSort(countries));
    expect(result.current[0]).toEqual(countries);
    expect(result.current[1]).toEqual({ key: 'population', order: 'asc' });
    expect(typeof result.current[2]).toBe('function');
  });
  it('should sort data', async () => {
    const { result } = renderHook(() => useSort(countries));
    expect(result.current[0]).toEqual(countries);
    expect(result.current[1]).toEqual({ key: 'population', order: 'asc' });
    expect(typeof result.current[2]).toBe('function');
    expect(result.current[0][0].name).toEqual('Bouvet Island');

    const desc = { key: 'population', order: 'desc' as const };

    act(() => {
      result.current[2](desc);
    });

    expect(result.current[0][0].name).toEqual('China');
    expect(result.current[1]).toEqual(desc);
  });
});
