import {
  Box,
  ChakraProvider,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { AppPage } from "./lib/components/AppPage";
import { getSpreadsheet } from "./lib/utils/get-spreadsheet";
import { ColumnFilter } from "./lib/components/ColumnFilter";
import { FiSearch } from "react-icons/all";
import { FileUploader } from "./lib/components/FileUploader";
import { VirtualTable } from "./lib/components/VirtualTable";
import { Column } from "react-table";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const [spreadSheet, setSpreadsheet] = useState<{ [key: string]: string }[]>(
    []
  );
  const [selected, setSelected] = useState<string | undefined>("Tutte");
  const [, setValue] = useState<string>("");

  const appContainerRef = useRef<HTMLDivElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (file) {
      getFile(file).then((spreadsheet) => {
        const firstRow = spreadsheet.shift();
        if (firstRow) {
          setColumns(
            firstRow.map((row, index) => ({
              Header: row,
              id: String(index),
              accessor: `acc_${index}`,
              width: 150,
            }))
          );
        }
        // @ts-ignore
        const spread = spreadsheet.reduce((acc: any[], row: any[]) => {
          return [
            ...acc,
            {
              ...row.reduce(
                (accInnerRow, innerRow, i) => ({
                  ...accInnerRow,
                  [`acc_${i}`]: innerRow,
                }),
                {}
              ),
            },
          ];
        }, []);
        setSpreadsheet(spread);
        console.log(spread);
      });
    } else {
      setColumns([]);
      setSpreadsheet([]);
    }
  }, [file]);

  const getFile = async (file: File) => {
    const buffer = await file?.arrayBuffer();
    return getSpreadsheet<[string[], ...any[]]>(buffer, "buffer");
  };

  return (
    <>
      <ChakraProvider>
        <AppPage>
          <Box
            ref={appContainerRef}
            h="100%"
            borderRadius="6px"
            backgroundColor="white"
          >
            <Box ref={headerContainerRef}>
              <Stack spacing="4" p={6} pb={2}>
                <FileUploader
                  file={file}
                  onFileChange={setFile}
                  acceptedFileTypes={[".csv", ".xls", ".xlsx"]}
                />

                <InputGroup variant="filled" size="lg">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FiSearch color="gray.300" />}
                  />
                  <Input
                    type="text"
                    onChange={(evt) => setValue(evt.target.value)}
                    placeholder="Ricerca"
                  />
                </InputGroup>
              </Stack>

              <Divider mt={2} mb={2} />

              <Stack spacing={4} p={6} py={2}>
                <Box>
                  <ColumnFilter
                    onChangeSelected={setSelected}
                    selected={selected || "Tutte"}
                    columns={
                      columns.length > 0
                        ? columns.map((c) => c.Header as string)
                        : ["Tutte"]
                    }
                  />
                </Box>
              </Stack>
            </Box>

            <Divider mt={2} mb={2} />

            <Box mt={2} mb={2}>
              {/*<DataTable/>*/}
              <VirtualTable
                columns={columns}
                data={spreadSheet}
                height={
                  (appContainerRef.current?.clientHeight || 0) -
                  (headerContainerRef.current?.clientHeight || 0) -
                  100
                }
              />
            </Box>
          </Box>
        </AppPage>
      </ChakraProvider>
    </>
  );
}

export default App;
