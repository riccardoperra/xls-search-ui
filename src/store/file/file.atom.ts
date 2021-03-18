import { atom } from "recoil";
import { Column } from "react-table";

type FileStoreState = {
  fileName: string | null;
  loading: boolean;
  columns: Column[];
  rows: Record<string, string>[];
  columnSearch: string;
  columnType: string | null;
};

export const fileStore = atom<FileStoreState>({
  key: "fileStore",
  default: {
    fileName: null,
    columns: [],
    rows: [],
    loading: false,
    columnType: null,
    columnSearch: "",
  },
});
