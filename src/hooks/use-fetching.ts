import { useEffect } from 'react';
import { useSetState } from './use-set-state';

type FetchingState<D> = { data: D | null; loaded: boolean; fetching: boolean; error: Error | null };

export const useFetching = <D>(url: string): FetchingState<D> => {
  const initialState: FetchingState<D> = { data: null, loaded: false, fetching: false, error: null };
  const [state, setState] = useSetState(initialState);

  useEffect(() => {
    setState({ data: null, loaded: false, fetching: true, error: null });
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          setState({ data: result, loaded: true, fetching: false, error: null });
        },
        error => {
          setState({ data: null, loaded: true, fetching: false, error: error });
        }
      );
  }, [setState, url]);

  return state;
};
