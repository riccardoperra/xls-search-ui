import { FC } from "react";
import { UsePaginationInstanceProps, UsePaginationState } from "react-table";
import React, { Box, Flex, Select, Stack } from "@chakra-ui/react";
import { PageList } from "./PageList";
import { useObservable } from "../../../utils";
import { isMobile$ } from "../../../../store";

type PaginationProps<D extends object = {}> = Omit<
  UsePaginationInstanceProps<D>,
  "page"
> &
  UsePaginationState<D>;

export const Pagination: FC<PaginationProps> = ({
  gotoPage,
  setPageSize,
  pageIndex,
  pageSize,
}) => {
  const [isMobile] = useObservable(isMobile$);

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      justifyContent={isMobile ? "flex-start" : "space-between"}
    >
      <Flex alignItems="center">
        <Box minWidth={150}>Righe per pagina:</Box>
        <Select
          variant="filled"
          onChange={(evt) => setPageSize(Number(evt.target.value))}
          value={pageSize}
        >
          {[20, 30, 40, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </Flex>

      <PageList
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPageChange={gotoPage}
      />
    </Stack>
  );
};
