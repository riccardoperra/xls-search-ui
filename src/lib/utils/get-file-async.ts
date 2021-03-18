import { getSpreadsheet } from "./get-spreadsheet";

export const getFileAsync = async (file: File) => {
  const buffer = await file?.arrayBuffer();
  return getSpreadsheet<[string[], ...any[]]>(buffer, "buffer");
};
