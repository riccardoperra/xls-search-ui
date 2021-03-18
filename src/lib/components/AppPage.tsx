import { Box } from "@chakra-ui/react";
import React, { FC } from "react";
import { useObservable } from "../utils";
import { isMobile$ } from "../../store";

export const AppPage: FC = ({ children }) => {
  const [isMobile] = useObservable(isMobile$);
  // TODO: fix windowSize re-rendering component
  // const [size] = useObservable(windowSize$);

  return (
    <Box
      backgroundColor="gray.300"
      h={window?.innerHeight}
      w={window?.innerWidth}
      p={isMobile ? 2 : 6}
      overflow="hidden"
    >
      {children}
    </Box>
  );
};
