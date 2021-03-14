import {Box} from '@chakra-ui/react';
import React, {FC} from 'react';
import {useObservable} from '../../state/state-utils';
import {windowSize$} from '../../state/ui';

export const AppPage: FC = ({children}) => {
  // const [size] = useObservable(windowSize$);

  return (
    <Box
      backgroundColor="gray.300"
      h={window?.innerHeight}
      w={window?.innerWidth}
      p={6}
      overflow="hidden"
    >
      {children}
    </Box>
  );
};
