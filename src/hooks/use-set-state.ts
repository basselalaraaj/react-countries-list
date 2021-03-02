import { Dispatch, useReducer } from 'react';

export const useSetState = <S>(initialState: S): [S, Dispatch<S>] => {
  const [state, setState] = useReducer((state: S, newState: S) => ({ ...state, ...newState }), initialState);
  return [state, setState];
};
