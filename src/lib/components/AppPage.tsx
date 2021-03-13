import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

export const AppPage: FC = ({ children }) => {
  return (
    <Box
      backgroundColor="gray.300"
      h={window.innerHeight}
      w={window.innerWidth}
      p={6}
      overflow="hidden"
    >
      {children}
    </Box>
  );
};
