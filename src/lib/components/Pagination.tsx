import {FC} from 'react';
import {UsePaginationInstanceProps, UsePaginationState} from 'react-table';
import {PageList} from './Pagination/PageList';
import React, {Box, Flex, Select, Stack} from '@chakra-ui/react';
import {useObservable} from '../../state/state-utils';
import {isMobile$} from '../../state/ui';

type PaginationProps<D extends object = {}> =
  Omit<UsePaginationInstanceProps<D>, 'page'>
  & UsePaginationState<D>;

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({length}, (_, i) => start + i);
};

// const startPages = (boundaryCount: number) => range(1, Math.min(boundaryCount, count));
// const endPages = (boundaryCount: number) => range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

export const Pagination: FC<PaginationProps> =
  ({
     canNextPage,
     canPreviousPage,
     gotoPage,
     nextPage,
     pageOptions,
     setPageSize,
     pageIndex,
     pageSize
   }) => {
    const [isMobile] = useObservable(isMobile$);

    return (
      <Stack
        direction={isMobile ? 'column' : 'row'}
        justifyContent={isMobile ? 'flex-start' : 'space-between'}>
        <Flex alignItems='center'>
          <Box minWidth={150}>
            Righe per pagina:
          </Box>
          <Select
            variant='filled'
            onChange={evt => setPageSize(Number(evt.target.value))}
            value={pageSize}>
            {[20, 30, 40, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </Select>
        </Flex>

        <PageList
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={gotoPage}
        />
      </Stack>
    );
  };
