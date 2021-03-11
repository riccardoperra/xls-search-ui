import {Box, Button, Flex, Icon, Input} from '@chakra-ui/react';
import React, {ChangeEvent, useCallback, useRef} from 'react';
import {FiTrash, FiUpload} from 'react-icons/all';

interface FileInputProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  acceptedFileTypes: string[];
  // value: any;
  placeholder?: string;
}

export const FileUploader = (props: FileInputProps) => {
  const {file, acceptedFileTypes, placeholder, onFileChange} = props;
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

  const getFileName = useCallback(() => file ? file.name : '', [file]);

  return (
    <Box
      backgroundColor={file ? 'gray.200' : 'green.500'}
      h='100%' w='100%'>
      {!file
        ? (
          <>
            <input
              type='file'
              accept={acceptedFileTypes.join(', ')}
              ref={inputRef}
              onChange={handleChange}
              style={{display: 'none'}}
            />
            <Button
              leftIcon={<Icon as={FiUpload}/>}
              w='100%'
              h='100%'
              onClick={handleClick}
              borderRadius={0}>
              Carica file
            </Button>
          </>
        )
        : (
          <Flex
            h='100%'
            px={4}
            justifyContent="space-between"
            alignItems="center">
            <Box
              maxWidth='50%'
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
              fontWeight="bold">{getFileName()}</Box>
            <FiTrash
              cursor='pointer'
              onClick={removeFile}/>
          </Flex>
        )
      }
    </Box>
  );
};
