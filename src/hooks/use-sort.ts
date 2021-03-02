import { useCallback, useMemo, useState } from 'react';

export type Sort = { key: string; order: 'asc' | 'desc' };
type UseSort = <D extends { [key: string]: any }>(data: D[] | null) => [D[] | undefined, Sort, (sort: Sort) => void];

export const useSort: UseSort = data => {
  const [sort, setSort] = useState<Sort>({ key: 'population', order: 'asc' });
  const setSorting = useCallback(({ key, order }: Sort) => setSort({ key, order }), [setSort]);

  const sortedData = useMemo(
    () =>
      data?.sort((a, b) => {
        const compareA = a[sort.key];
        const compareB = b[sort.key];

        if (typeof compareA === 'number' && typeof compareB === 'number') {
          return sort.order === 'asc' ? compareA - compareB : compareB - compareA;
        }

        return 0;
      }),
    [data, sort]
  );

  return [sortedData, sort, setSorting];
};
