import {
  Column,
  TableOptions,
  UsePaginationInstanceProps,
  UsePaginationState,
  UseTableInstanceProps,
} from "react-table";

export interface ExcelTableProps {
  data: any;
  columns: Column[];
  height: number;
}

export interface TableInstanceWithPagination<D extends object = {}>
  extends Omit<TableOptions<D>, "columns" | "pageCount">,
    UseTableInstanceProps<D>,
    UsePaginationInstanceProps<D> {}

export type TableWithPagination<
  D extends object = {}
> = TableInstanceWithPagination & { state: UsePaginationState<D> };
