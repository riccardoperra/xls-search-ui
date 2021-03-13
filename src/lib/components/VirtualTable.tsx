import {Box, Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import React, {FC} from 'react';
import {FixedSizeList} from 'react-window';
import {Column, useFlexLayout, useTable} from 'react-table';

type TableData<T> = T[];

interface VirtualTableProps<T = any> {
  data: any;
  columns: Column[];
  height: number;
}

const scrollbarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;');
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

export const VirtualTable: FC<VirtualTableProps> = (props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable<any>(
    {
      columns: props.columns as Column<any>[],
      data: props.data,
    },
    useFlexLayout
  );

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

  const RenderRow = React.useCallback(
    ({index, style}) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <Tr
          as={Box}
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map(cell => {
            return (
              <Td as={Box}
                  {...cell.getCellProps()}
                  position="relative"
              >
                {cell.render('Cell')}
              </Td>
            );
          })}
        </Tr>
      );
    },
    [prepareRow, rows]
  );

  return (
      <Table
        {...getTableProps()}
        as={Box}
        overflow='auto'
        size="sm">
        <Thead
          as={Box}
          minWidth='auto'>
          {headerGroups.map(headerGroup => (
            <Tr as={Box} {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map(column => (
                <Th as={Box}
                    position="relative"
                    {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody
          as={Box}
          {...getTableBodyProps()}
          minWidth='auto'
          overflowX='hidden'>
          <FixedSizeList
            height={props.height}
            itemCount={rows.length}
            itemSize={45}
            width={totalColumnsWidth + scrollBarSize}
          >
            {RenderRow}
          </FixedSizeList>
        </Tbody>
      </Table>
  );


};

function getStyles(props: any, align: any) {
  throw new Error('Function not implemented.');
}

