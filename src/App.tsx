import {Box, ChakraProvider, Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import {AppPage} from './lib/components/AppPage';
import {getSpreadsheet} from './lib/utils/get-spreadsheet';
import {Footer} from './lib/components/Header';
import {FileUploader} from './lib/components/FileUploader';
import {ColumnFilter} from './lib/components/ColumnFilter';

function App() {
  const footerHeight = '56px';
  const headerHeight = '56px';
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [spreadSheet, setSpreadsheet] = useState<any[][]>([]);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (file) {
      getFile(file).then(spreadsheet => {
        const firstRow = spreadsheet.shift();
        if (firstRow) {
          setColumns(firstRow);
        }
        setSpreadsheet(spreadsheet as any[]);
        console.log(firstRow, spreadsheet);
      });
    } else {
      setColumns([]);
      setSpreadsheet([]);
    }
  }, [file]);

  const getFile = async (file: File) => {
    const buffer = await file?.arrayBuffer();
    return getSpreadsheet<[string[], ...any[]]>(buffer, 'buffer');
  };

  const getContainerHeight = useMemo(() => {
    return `calc(100% - ${footerHeight} - ${headerHeight})`;
  }, [file]);

  return (
    <>
      <ChakraProvider>
        <AppPage>
          <Box
            height={headerHeight}
            p={2}>
            {file && columns && (
              <ColumnFilter
                onChangeSelected={setSelected}
                selected={selected}
                columns={columns}
                value={value}
                onValueChange={setValue}
              />
            )}
          </Box>

          <Box
            height={getContainerHeight}
            overflow='auto'>
            <Table size="sm" variant="simple">
              <Thead>
                <Tr>
                  {columns.map((column, index) => (
                    <Th key={index}>{column}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {spreadSheet.map((columns, index) => (
                  <Tr key={index}>
                    {columns.map((column, i) => (
                      <Td key={`${index}_${i}_${column}`}>
                        {column}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>


          <Footer height="56px">
            <FileUploader
              file={file}
              onFileChange={setFile}
              acceptedFileTypes={['.xlsx', '.xls', '.csv']}
            />
          </Footer>

        </AppPage>
      </ChakraProvider>

    </>
  );
}

export default App;
