import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useSetState } from './use-set-state';

describe('useSetState', () => {
  it('should use set state', async () => {
    const { result } = renderHook(() => useSetState({}));
    expect(result.current[0]).toEqual({});
    expect(typeof result.current[1]).toBe('function');
  });
  it('should set state', async () => {
    const initialState = { a: 1 };
    const { result } = renderHook(() => useSetState(initialState));
    expect(result.current[0]).toEqual(initialState);
    expect(typeof result.current[1]).toBe('function');

    const newState = { a: 2, b: 1 };

    act(() => {
      result.current[1](newState);
    });

    expect(result.current[0]).toEqual(newState);
  });
});
