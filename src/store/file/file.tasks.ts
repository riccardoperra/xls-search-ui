import { CallbackInterface } from "recoil";
import { fileStore } from "./file.atom";
import { getFileAsync } from "../../lib/utils";

export const setSearchColumnFn = ({ set }: CallbackInterface) => (
  search: string
) => {
  set(fileStore, (state) => ({ ...state, columnSearch: search }));
};

export const setSearchColumnTypeFn = ({ set }: CallbackInterface) => (
  search: string | undefined
) => {
  set(fileStore, (state) => ({
    ...state,
    columnType: search ? search : "Tutte",
  }));
};

export const setFileFromObjectFn = ({ set }: CallbackInterface) => async (
  file: File | null
) => {
  set(fileStore, (state) => ({ ...state, loading: true }));
  if (file) {
    const spreadsheet = await getFileAsync(file);
    const firstRow = spreadsheet.shift();
    if (firstRow) {
      const columns = firstRow.map((row, index) => ({
        Header: row,
        id: String(index),
        accessor: `acc_${index}`,
      }));
      const rows = spreadsheet.map((row) => ({
        ...row.reduce(
          (accInnerRow, innerRow, i) => ({
            ...accInnerRow,
            [`acc_${i}`]: innerRow,
          }),
          {}
        ),
      }));
      set(fileStore, (state) => ({ ...state, columns, rows, loading: false }));
    } else {
      set(fileStore, (state) => ({
        ...state,
        columns: [],
        rows: [],
        loading: false,
      }));
    }
  } else {
    set(fileStore, (state) => ({
      ...state,
      loading: false,
      columns: [],
      fileName: null,
      rows: [],
    }));
  }
};
