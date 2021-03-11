import { Box } from '@chakra-ui/react';
import React, {FC} from 'react';

interface HeaderProps {
  height: string;
}

export const Footer: FC<HeaderProps> = (props) => {
  return (
    <Box
      w='100%'
      borderBottom='1px solid'
      backgroundColor='gray.200'
      borderBottomColor='gray.200'
      h={props.height}>
      {props.children}
    </Box>
  )
}
