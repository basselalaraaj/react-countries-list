import * as React from 'react';
import styled from 'styled-components';
import { Loader } from '../../components/Loader';
import { useCountries } from '../../hooks/use-countries';
import { Accessors, Filters, FilterStrategy } from '../../hooks/use-filter';
import { Country } from '../components/Country';
import { DefaultFilter, defaultFilter } from '../components/DefaultFilter';
import { RangeFilter, rangeFilter } from '../components/RangeFilter';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    table-layout: fixed;
    width: 70%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const filtersStrategy: FilterStrategy = {
  [Filters.DEFAULT]: {
    filter: defaultFilter,
    FilterComponent: DefaultFilter
  },
  [Filters.RANGE]: {
    filter: rangeFilter,
    FilterComponent: RangeFilter
  }
};

type Column = { header: string; key: Accessors; filter: Filters; sort?: boolean };

const columns: Column[] = [
  { header: 'Country', key: Accessors.NAME, filter: Filters.DEFAULT },
  {
    header: 'Country Code',
    key: Accessors.ALPHA2CODE,
    filter: Filters.DEFAULT
  },
  {
    header: 'Population',
    key: Accessors.POPULATION,
    filter: Filters.RANGE,
    sort: true
  }
];

const StyledSort = styled.span`
  cursor: pointer;
`;

export const CountryListContainer = (): JSX.Element | null => {
  const [data, actions] = useCountries(filtersStrategy);
  const { countries, fetching, error, loaded, sorting } = data;

  if (!countries && fetching) {
    return (
      <div className="countries">
        <Loader />
      </div>
    );
  }

  if (!countries || countries.length === 0 || (!fetching && error && loaded)) {
    return (
      <div className="countries">
        <span role="country-list-error">We are not able to load the country list.</span>
      </div>
    );
  }

  const sort = (key: Accessors) => () => actions.setSorting({ key, order: sorting.order === 'asc' ? 'desc' : 'asc' });
  const sortingOrder = sorting.order === 'asc' ? '⬇' : '⬆';

  return (
    <Styles>
      <table role="country-list">
        <thead>
          <tr>
            {columns.map(column => {
              const { filter } = column;
              const { FilterComponent } = filtersStrategy[filter];
              return (
                <th key={column.key}>
                  {column.header} {column.sort && <StyledSort onClick={sort(column.key)}>{sortingOrder}</StyledSort>}
                  <FilterComponent column={column} onChange={actions.setFilter} />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {countries?.map(country => (
            <tr key={country.numericCode}>
              <Country country={country} />
            </tr>
          ))}
        </tbody>
      </table>
    </Styles>
  );
};
