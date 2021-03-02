import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Accessors, Filters } from '../../hooks/use-filter';
import { RangeFilter, rangeFilter } from './RangeFilter';

describe('RangeFilter Component', () => {
  const defaultProps = { column: { header: 'population', key: Accessors.POPULATION, filter: Filters.RANGE } };
  const onChange = jest.fn();
  it('displays country details', async () => {
    const { queryByTitle } = render(<RangeFilter {...defaultProps} onChange={onChange} />);
    expect(onChange).toBeCalledTimes(0);

    fireEvent.change(queryByTitle('min'), { target: { value: '100' } });
    expect(onChange).toBeCalledTimes(1);

    fireEvent.change(queryByTitle('max'), { target: { value: '200' } });
    expect(onChange).toBeCalledTimes(2);
  });
});

describe('rangeFilter', () => {
  it('should return false when type other then number is passed', async () => {
    expect(rangeFilter('1', [0])).toBeFalsy();
  });
  it('should return false when type other then array is passed', async () => {
    expect(rangeFilter(0, 0)).toBeFalsy();
  });
  it('should return false when array content is not a number', async () => {
    expect(rangeFilter(0, ['string'])).toBeFalsy();
  });
  it('should return true when row value is higher then min', async () => {
    expect(rangeFilter(10, [0, 100])).toBeTruthy();
  });
  it('should return false when row value is lower then min', async () => {
    expect(rangeFilter(10, [50, 100])).toBeFalsy();
  });
  it('should return true when row value is lower then max', async () => {
    expect(rangeFilter(10, [0, 50])).toBeTruthy();
  });
  it('should return false when row value is higher then max', async () => {
    expect(rangeFilter(100, [0, 50])).toBeFalsy();
  });
});
