import {Box} from '@chakra-ui/react';
import React, {FC} from 'react';

export const AppPage: FC = ({children}) => {
  return (
    <Box
      h={window.innerHeight}
      w={window.innerWidth}
      overflow='hidden'>
      {children}
    </Box>
  );
};
