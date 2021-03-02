import * as React from 'react';
import { FilterComponent, FilterFn } from '../../hooks/use-filter';

export const DefaultFilter: FilterComponent = ({ column, onChange }) => {
  return (
    <div>
      <input
        title={column.key}
        name={column.key}
        onChange={e => {
          onChange({ ...column, filterValue: e.target.value });
        }}
        placeholder={`Search ${column.key}`}
      />
    </div>
  );
};

export const defaultFilter: FilterFn = (rowValue, filterValue) => {
  if (typeof rowValue !== 'string' || typeof filterValue !== 'string') {
    return false;
  }
  return rowValue.toLowerCase().includes(filterValue.toLowerCase());
};
