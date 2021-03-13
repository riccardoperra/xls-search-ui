import { Box, Button, Stack } from "@chakra-ui/react";
import React, { ChangeEvent, useCallback, useRef } from "react";
import { IoTrashBin } from "react-icons/all";

interface FileInputProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  acceptedFileTypes: string[];
  placeholder?: string;
}

export const FileUploader = (props: FileInputProps) => {
  const { file, acceptedFileTypes, onFileChange } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!!inputRef.current) {
      inputRef.current?.click();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    onFileChange(files ? files[0] : null);
  };

  const removeFile = () => onFileChange(null);

  const getFileName = useCallback(
    () => (!!file ? file.name : "Nessun file caricato"),
    [file]
  );

  return (
    <Stack direction="row" alignItems="center" spacing="4">
      <Button colorScheme="green" variant="solid" onClick={handleClick}>
        Carica file
      </Button>
      <input
        type="file"
        accept={acceptedFileTypes.join(", ")}
        ref={inputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <Box mr={4}>{getFileName()}</Box>
      {!!file && <IoTrashBin onClick={removeFile} cursor="pointer" />}
    </Stack>
  );
};
