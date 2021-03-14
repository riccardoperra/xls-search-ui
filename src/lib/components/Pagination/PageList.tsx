import usePagination, {PaginationItemType} from './use-pagination';
import React, {FC} from 'react';
import {Button, ButtonGroup} from '@chakra-ui/react';
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineEllipsis,
  AiOutlineLeft,
  AiOutlineRight
} from 'react-icons/all';

interface PageListProps {
  pageSize: number;
  pageIndex: number;
  onPageChange: (page: number) => void
}

export const PageList: FC<PageListProps> = (props) => {
  const pageItems = usePagination({
    pageSize: props.pageSize,
    boundaryCount: 1,
    pageIndex: props.pageIndex,
    showLast: true,
    showFirst: true,
    showNext: false,
    showPrevious: false
  });

  const PageItemLabel = (itemType: PaginationItemType) => {
    if (typeof itemType === 'number') {
      return itemType;
    }
    if (itemType === 'start-ellipsis' || itemType === 'end-ellipsis') {
      return <AiOutlineEllipsis/>;
    }
    if (itemType === 'previous') {
      return <AiOutlineLeft/>;
    }
    if (itemType === 'next') {
      return <AiOutlineRight/>;
    }
    if (itemType === 'first') {
      return <AiOutlineDoubleLeft/>;
    }
    if (itemType === 'last') {
      return <AiOutlineDoubleRight/>;
    }
    return itemType;
  };

  const handleClick = (newPage: number) => props.onPageChange(newPage);

  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      {pageItems.map(pageItem => (
        <Button
          key={pageItem.type}
          isActive={pageItem.type === props.pageIndex}
          onClick={() => handleClick(pageItem.action)}
          mr="-px">
          {PageItemLabel(pageItem.type)}
        </Button>
      ))}
    </ButtonGroup>
  );
};
