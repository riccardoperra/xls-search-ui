import {read, WorkBook, utils, ParsingOptions} from 'xlsx';

export const getSpreadsheet = <T>(
  data: any,
  type: ParsingOptions['type']
): T[] => {
  const workBook = read(data, {type});
  const workSheet = workBook.Sheets[workBook.SheetNames[0]];
  return utils.sheet_to_json(workSheet, {header: 1, raw: true});
};
