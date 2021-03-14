import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { FC, useMemo, useRef } from "react";
import {
  Column,
  TableOptions,
  useFlexLayout,
  usePagination,
  UsePaginationInstanceProps,
  UsePaginationState,
  useTable,
  UseTableInstanceProps,
} from "react-table";
import { Pagination } from "./Pagination";

interface VirtualTableProps {
  data: any;
  columns: Column[];
  height: number;
}

export interface TableInstanceWithPagination<D extends object = {}>
  extends Omit<TableOptions<D>, "columns" | "pageCount">,
    UseTableInstanceProps<D>,
    UsePaginationInstanceProps<D> {}

type TableWithPagination<
  D extends object = {}
> = TableInstanceWithPagination & { state: UsePaginationState<D> };

export const VirtualTable: FC<VirtualTableProps> = (props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<any>(
    { columns: props.columns as Column<any>[], data: props.data },
    useFlexLayout,
    usePagination
  ) as TableWithPagination;

  const headerRef = useRef<HTMLTableSectionElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const getTableHeight = useMemo(() => {
    console.log(
      headerRef.current?.clientHeight,
      paginationRef.current?.clientHeight
    );
    return (
      Number(props.height) -
      Number(headerRef.current?.clientHeight) -
      Number(paginationRef.current?.clientHeight)
    );
  }, [headerRef, paginationRef, props.height]);

  return (
    <Box height={props.height} display="flex" flexDirection="column">
      <Table
        flex={1}
        as={Box}
        {...getTableProps()}
        size="sm"
        overflowX="auto"
        overflowY="hidden"
      >
        <Thead ref={headerRef} as={Box}>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <Th position="relative" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody
          {...getTableBodyProps()}
          as={Box}
          width='100%'
          overflowY="auto"
          overflowX='hidden'
          height={getTableHeight}
        >
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Box ref={paginationRef} p={4}>
        <Pagination
          pageCount={pageCount}
          pageOptions={pageOptions}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          gotoPage={gotoPage}
          previousPage={previousPage}
          nextPage={nextPage}
          setPageSize={setPageSize}
          pageSize={pageSize}
          pageIndex={pageIndex}
        />
      </Box>
    </Box>
  );
};
