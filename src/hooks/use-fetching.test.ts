import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useFetching } from './use-fetching';

describe('useFetching', () => {
  const fetchSpy = jest.spyOn(window, 'fetch');
  it('should return data use fetching', async () => {
    const mockData = [{ a: 1 }];
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );
    const { result, waitForNextUpdate } = renderHook(() => useFetching('http://example'));

    expect(result.current).toEqual({ data: null, loaded: false, fetching: true, error: null });

    await waitForNextUpdate();

    expect(result.current).toEqual({ data: [{ a: 1 }], loaded: true, fetching: false, error: null });
  });
  it('should throw error use fetching', async () => {
    fetchSpy.mockImplementationOnce(() => Promise.reject('Api is down'));
    const { result, waitForNextUpdate } = renderHook(() => useFetching('http://example'));

    expect(result.current).toEqual({ data: null, loaded: false, fetching: true, error: null });

    await waitForNextUpdate();

    expect(result.current).toEqual({ data: null, loaded: true, fetching: false, error: 'Api is down' });
  });
});
