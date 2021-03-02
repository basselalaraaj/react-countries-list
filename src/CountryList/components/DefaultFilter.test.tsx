import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Accessors, Filters } from '../../hooks/use-filter';
import { DefaultFilter, defaultFilter } from './DefaultFilter';

describe('DefaultFilter Component', () => {
  const defaultProps = { column: { header: 'name', key: Accessors.NAME, filter: Filters.DEFAULT } };
  const onChange = jest.fn();
  it('displays country details', async () => {
    const { queryByTitle } = render(<DefaultFilter {...defaultProps} onChange={onChange} />);
    expect(onChange).toBeCalledTimes(0);
    fireEvent.change(queryByTitle('name'), { target: { value: 'a' } });
    expect(onChange).toBeCalledTimes(1);
  });
});

describe('defaultFilter', () => {
  it('should return false when type other then string is passed', async () => {
    expect(defaultFilter(0, 0)).toBeFalsy();
  });
  it('should return false when filter value doesnt match row value', async () => {
    expect(defaultFilter('afghanistan', 'abc')).toBeFalsy();
  });
  it('should return true when filter value matches row value', async () => {
    expect(defaultFilter('afghanistan', 'ani')).toBeTruthy();
  });
});
