import {Icon, Input, InputGroup, InputLeftElement, InputRightElement} from '@chakra-ui/react';
import React, {ChangeEvent, ChangeEventHandler, useCallback, useRef, useState} from 'react';

import {FiFile, FiTrash} from 'react-icons/all';

interface FileInputProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  acceptedFileTypes: string[];
  // value: any;
  placeholder?: string;
}

export const FileInput = (props: FileInputProps) => {
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

  const removeFile = () => onFileChange(null)

  const getFileName = useCallback(() => file ? file.name : '', [file]);

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={FiFile}/>}
      />
      <input
        type='file'
        accept={acceptedFileTypes.join(', ')}
        ref={inputRef}
        onChange={handleChange}
        style={{display: 'none'}}
      />
      <Input
        placeholder={placeholder || 'Your file ...'}
        onClick={handleClick}
        readOnly
        value={getFileName()}
      />
      {file && (
        <InputRightElement
          cursor='pointer'
          onClick={removeFile}
          children={<Icon as={FiTrash}/>}
        />
      )}
    </InputGroup>
  );
};
