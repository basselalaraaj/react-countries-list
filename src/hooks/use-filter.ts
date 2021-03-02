import { useCallback, useMemo } from 'react';
import { useSetState } from './use-set-state';

export enum Accessors {
  NAME = 'name',
  ALPHA2CODE = 'alpha2Code',
  POPULATION = 'population'
}

export enum Filters {
  DEFAULT = 'default',
  RANGE = 'range'
}

export interface Filter {
  header: string;
  key: Accessors;
  filter: Filters;
}

export interface FilterValue {
  filterValue?: string | number[];
}

export type SetFilter = (filter: Filter & FilterValue) => void;

export type FilterFn = <R, F>(rowValue: R, filterValue: F) => boolean;

export type FilterComponent = (props: { column: Filter; onChange: SetFilter }) => JSX.Element;
export type FilterStrategy = {
  [K in Filters]: {
    filter: FilterFn;
    FilterComponent: FilterComponent;
  };
};

type UseFilter = <D extends { [key: string]: any }>(
  filtersData: FilterStrategy,
  data: D[] | null
) => [D[] | null, (filter: Filter) => void];

export const useFilter: UseFilter = (filtersData, data) => {
  const initialState: { [key: string]: Filter & FilterValue } = {};
  const [filters, setState] = useSetState(initialState);

  const setFilter: SetFilter = useCallback(filter => setState({ [filter.key]: filter }), [setState]);

  const filteredData = useMemo(
    () =>
      data?.filter(row =>
        Object.entries(filters).every(([, { key, filter, filterValue }]) =>
          filtersData[filter].filter(row[key], filterValue)
        )
      ) ?? null,
    [data, filters, filtersData]
  );

  return [filteredData, setFilter];
};
