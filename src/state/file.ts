import {getSpreadsheet} from '../lib/utils/get-spreadsheet';
import {Column} from 'react-table';
import {atom, CallbackInterface, selector} from 'recoil';

/** utils **/
const getFile = async (file: File) => {
  const buffer = await file?.arrayBuffer();
  return getSpreadsheet<[string[], ...any[]]>(buffer, 'buffer');
};

type FileStoreState = {
  fileName: string | null;
  loading: boolean;
  columns: Column[],
  rows: Record<string, string>[];
  columnSearch: string;
  columnType: string | null;
}

export const setSearchColumnFn = ({set}: CallbackInterface) => (search: string) => {
  set(fileStore, state => ({...state, columnSearch: search}));
};

export const setSearchColumnTypeFn = ({set}: CallbackInterface) => (search: string | undefined) => {
  set(fileStore, state => ({...state, columnType: search ? search : 'Tutte'}));
};


export const setFileFromObjectFn = ({set}: CallbackInterface) => async (file: File | null) => {
  set(fileStore, state => ({...state, loading: true}));
  if (file) {
    const spreadsheet = await getFile(file);
    const firstRow = spreadsheet.shift();
    if (firstRow) {
      const columns = firstRow.map((row, index) => ({
        Header: row,
        id: String(index),
        accessor: `acc_${index}`,
      }));
      const rows = spreadsheet.map(row => ({
        ...row.reduce(
          (accInnerRow, innerRow, i) => ({
            ...accInnerRow,
            [`acc_${i}`]: innerRow,
          }),
          {}
        ),
      }));
      set(fileStore, state => ({...state, columns, rows, loading: false}));
    } else {
      set(fileStore, state => ({...state, columns: [], rows: [], loading: false}));
    }
  } else {
    set(fileStore, state => ({
      ...state,
      loading: false,
      columns: [],
      fileName: null,
      rows: []
    }));
  }
};

export const fileStore = atom<FileStoreState>({
  key: 'fileStore',
  default: {
    fileName: null,
    columns: [],
    rows: [],
    loading: false,
    columnType: null,
    columnSearch: ''
  }
});

export const filteredRowsByType = selector({
  key: 'fileStore/filteredColumns',
  get: ({get}) => {
    const {rows, columns, columnSearch, columnType} = get(fileStore);

    if (!columnSearch || columnSearch.length < 2) {
      return rows;
    }

    console.log(columns, rows, columnSearch, columnType);
    return rows.filter(row => {
      const columnAccessor = columns.find(column => column.Header === columnType);
      if (columnAccessor && row[columnAccessor.accessor as string]) {
        return (!columnType || columnType === 'Tutte')
          ? true
          : row[columnAccessor.accessor as string] &&
          String(row[columnAccessor.accessor as string]).toLowerCase().startsWith(String(columnSearch).toLowerCase())
      }
    });
  },
});
