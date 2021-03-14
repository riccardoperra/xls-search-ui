import {Box} from '@chakra-ui/react';
import React, {FC, useMemo} from 'react';
import {useObservable} from '../../state/state-utils';
import {isMobile$, windowSize$} from '../../state/ui';

export const AppPage: FC = ({children}) => {
  const [isMobile] = useObservable(isMobile$);
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
  )
};
