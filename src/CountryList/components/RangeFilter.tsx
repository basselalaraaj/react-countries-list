import * as React from 'react';
import { useState } from 'react';
import { FilterComponent, FilterFn } from '../../hooks/use-filter';

export const RangeFilter: FilterComponent = ({ column, onChange }) => {
  const [state, setState] = useState({ min: -Infinity, max: Infinity });
  return (
    <div>
      <input
        type="number"
        title="min"
        min={0}
        onChange={e => {
          setState({ min: Number(e.target.value), max: state.max });
          onChange({ ...column, filterValue: [Number(e.target.value), state.max] });
        }}
        style={{
          width: '70px',
          marginRight: '0.5rem'
        }}
        placeholder={`0`}
      />
      to
      <input
        type="number"
        title="max"
        min={0}
        onChange={e => {
          setState({ min: state.min, max: Number(e.target.value) });
          onChange({ ...column, filterValue: [state.min, Number(e.target.value)] });
        }}
        style={{
          width: '70px',
          marginLeft: '0.5rem'
        }}
        placeholder={`0`}
      />
    </div>
  );
};

export const rangeFilter: FilterFn = (rowValue, filterValue) => {
  if (typeof rowValue !== 'number' || !Array.isArray(filterValue)) {
    return false;
  }
  const [min, max] = filterValue;

  if (typeof min !== 'number' || typeof max !== 'number') {
    return false;
  }

  return rowValue >= min && rowValue <= max;
};
