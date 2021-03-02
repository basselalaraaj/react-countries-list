import { useFetching } from './use-fetching';
import { Country } from '../models/country';
import { Filter, FilterStrategy, useFilter } from './use-filter';
import { useSort, Sort } from './use-sort';

type UseCountries = (
  filtersStrategy: FilterStrategy
) => [
  {
    countries: Country[] | undefined;
    error: Error | null;
    loaded: boolean;
    fetching: boolean;
    sorting: Sort;
  },
  {
    setFilter: (filter: Filter) => void;
    setSorting: (sort: Sort) => void;
  }
];

export const useCountries: UseCountries = filtersStrategy => {
  const { data: fetchedData, error, loaded, fetching } = useFetching<Country[]>('https://restcountries.eu/rest/v2/all');
  const [filterdData, setFilter] = useFilter(filtersStrategy, fetchedData);
  const [sortedData, sorting, setSorting] = useSort(filterdData);

  const data = { countries: sortedData, error, loaded, fetching, sorting };
  const actions = { setFilter, setSorting };

  return [data, actions];
};
