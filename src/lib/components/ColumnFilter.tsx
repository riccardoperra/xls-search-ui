import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { FiChevronDown } from "react-icons/all";

type Columns<T extends string[] = string[]> = T;

interface FilterProps {
  onChangeSelected: (selected: Columns[number] | undefined) => void;
  selected: Columns[number] | undefined;
  columns: Columns;
}

export const ColumnFilter: FC<FilterProps> = (props) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton size="lg">
            <Tag variant={"outline"} size="lg">
              <TagLabel>Colonna:</TagLabel>
              <Box ml="2" mr="2" color="gray.600">
                {props.selected}
              </Box>
              <TagRightIcon as={FiChevronDown} />
            </Tag>
          </MenuButton>
          <MenuList>
            {props.columns.map((column) => (
              <MenuItem
                key={column}
                onClick={() => props.onChangeSelected(column)}
              >
                {column}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};
