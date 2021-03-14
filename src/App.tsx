import {
  Box,
  ChakraProvider,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import './App.css';
import {AppPage} from './lib/components/AppPage';
import {ColumnFilter} from './lib/components/ColumnFilter';
import {FiSearch} from 'react-icons/all';
import {FileUploader} from './lib/components/FileUploader';
import {VirtualTable} from './lib/components/VirtualTable';
import {isMobile$, UIState$} from './state/ui';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {setObservableState, useObservable} from './state/state-utils';
import {
  fileStore,
  filteredRowsByType,
  setFileFromObjectFn,
  setSearchColumnFn,
  setSearchColumnTypeFn,
} from './state/file';
import {useRecoilCallback, useRecoilValue} from 'recoil';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const fileState = useRecoilValue(fileStore);
  const filteredRows = useRecoilValue(filteredRowsByType);
  const setFileFromObject = useRecoilCallback(setFileFromObjectFn);
  const setSearchColumn = useRecoilCallback(setSearchColumnFn);
  const setSearchColumnType = useRecoilCallback(setSearchColumnTypeFn);
  const [isMobile] = useObservable(isMobile$);

  const appContainerRef = useRef<HTMLDivElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);

  const onSetFile = (file: File | null) => {
    setFile(file);
    setFileFromObject(file);
  };

  useEffect(() => {
    const subscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() =>
          setObservableState(UIState$, () => ({
            innerWidth: window.innerWidth,
          }))
        )
      )
      .subscribe();
    return () => subscription.unsubscribe();
  }, []);

  const virtualTableHeight = useCallback(() => {
    return (
      (appContainerRef.current?.clientHeight || 0) -
      (headerContainerRef.current?.clientHeight || 0) -
      15
    );
  }, []);

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
                  onFileChange={onSetFile}
                  acceptedFileTypes={['.csv', '.xls', '.xlsx']}
                />

                <InputGroup variant="filled"
                            size={isMobile ? 'md' : 'lg'}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FiSearch color="gray.300"/>}
                  />
                  <Input
                    type="text"
                    value={fileState.columnSearch}
                    onChange={(evt) => setSearchColumn(evt.target.value)}
                    placeholder="Ricerca"
                  />
                </InputGroup>
              </Stack>

              <Divider mt={2} mb={2}/>

              <Stack spacing={4} p={6} py={2}>
                <Box>
                  <ColumnFilter
                    onChangeSelected={setSearchColumnType}
                    selected={fileState.columnType || 'Tutte'}
                    columns={
                      fileState.columns && fileState.columns?.length > 0
                        ? fileState.columns?.map((c) => c.Header as string)
                        : ['Tutte']
                    }
                  />
                </Box>
              </Stack>
            </Box>

            <Divider mt={2} mb={2}/>

            {(fileState.loading ||
              fileState.rows.length > 0 ||
              fileState.columns.length > 0) && (
              <Box mt={2} mb={2}>
                {fileState.loading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    height={virtualTableHeight()}
                    alignItems="center"
                  >
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </Box>
                ) : (
                  <VirtualTable
                    columns={fileState.columns || []}
                    data={filteredRows}
                    height={virtualTableHeight()}
                  />
                )}
              </Box>
            )}
          </Box>
        </AppPage>
      </ChakraProvider>
    </>
  );
}

export default App;
