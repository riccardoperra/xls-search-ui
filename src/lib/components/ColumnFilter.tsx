import {Box, Button, Input, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import React, {FC} from 'react';
import {FiChevronDown} from 'react-icons/all';

type Columns<T extends string[] = string[]> = T;

interface FilterProps {
  onChangeSelected: (selected: Columns[number] | undefined) => void;
  selected: Columns[number] | undefined;
  columns: Columns;
  value: string;
  onValueChange: (value: string) => void;
}

export const ColumnFilter: FC<FilterProps> = (props) => {
  return (
    <Box d='flex' justifyContent='space-between' alignItems='center'>
      <Menu>
        {({isOpen}) => (
          <>
            <MenuButton
              w='100%'
              isActive={isOpen}
              as={Button}
              rightIcon={<FiChevronDown/>}>
              Filtra per: {props.selected ?? ''}
            </MenuButton>
            <MenuList>
              {props.columns.map((column) => (
                <MenuItem
                  key={column}
                  onClick={() => props.onChangeSelected(column)}>{column}
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
      {props.selected && (
        <Input
          type="text"
          value={props.value}
          onChange={event => props.onValueChange(event.target.value)}
        />
      )}
    </Box>
  );
};
