import { selector } from "recoil";
import { fileStore } from "./file.atom";

export const filteredRowsByType = selector({
  key: "fileStore/filteredColumns",
  get: ({ get }) => {
    const { rows, columns, columnSearch, columnType } = get(fileStore);

    if (!columnSearch || columnSearch.length < 2) {
      return rows;
    }

    return rows.filter((row) => {
      const columnAccessor = columns.find(
        (column) => column.Header === columnType
      );
      if (columnAccessor && row[columnAccessor.accessor as string]) {
        return !columnType || columnType === "Tutte"
          ? true
          : row[columnAccessor.accessor as string] &&
              String(row[columnAccessor.accessor as string])
                .toLowerCase()
                .startsWith(String(columnSearch).toLowerCase());
      }
      return false;
    });
  },
});
