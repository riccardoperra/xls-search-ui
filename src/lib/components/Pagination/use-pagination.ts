const siblingCount = 1;

interface UsePaginationProps {
  pageIndex: number;
  pageSize: number;
  boundaryCount: number;
  showFirst?: boolean;
  showLast?: boolean;
  showPrevious?: boolean;
  showNext?: boolean;
}

export type PaginationItemType =
  | "first"
  | "last"
  | "start-ellipsis"
  | "end-ellipsis"
  | "next"
  | "previous"
  | string
  | number;

export default function usePagination({
  pageIndex,
  boundaryCount,
  pageSize,
  showPrevious,
  showNext,
  showFirst,
  showLast,
}: UsePaginationProps) {
  // https://dev.to/namirsab/comment/2050
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, pageSize));
  const endPages = range(
    Math.max(pageSize - boundaryCount + 1, boundaryCount + 1),
    pageSize
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      pageIndex - siblingCount,
      // Lower boundary when page is high
      pageSize - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      pageIndex + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : pageSize - 1
  );

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList: PaginationItemType[] = [
    ...(showFirst ? ["first"] : []),
    ...(!showPrevious ? [] : ["previous"]),
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? ["start-ellipsis"]
      : boundaryCount + 1 < pageSize - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < pageSize - boundaryCount - 1
      ? ["end-ellipsis"]
      : pageSize - boundaryCount > boundaryCount
      ? [pageSize - boundaryCount]
      : []),

    ...endPages,
    ...(!showNext ? [] : ["next"]),
    ...(showLast ? ["last"] : []),
  ];

  // Map the button type to its page number
  const buttonPage = (type: PaginationItemType): number => {
    switch (type) {
      case "first":
        return 1;
      case "previous":
        return pageIndex - 1;
      case "next":
        return pageIndex + 1;
      case "last":
        return pageSize;
      default:
        return type as number;
    }
  };

  // Convert the basic item list to PaginationItem props objects

  return itemList.map((item) => ({
    type: item,
    action: buttonPage(item),
  }));
}
